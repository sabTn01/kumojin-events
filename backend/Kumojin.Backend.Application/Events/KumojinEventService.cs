using System.Collections.Generic;
using System.Threading.Tasks;
using FluentValidation;
using Kumojin.Backend.Domain.KumojinEvents;
using Kumojin.Backend.Infrastructure.KumojinEvents;

namespace Kumojin.Backend.Application.Events
{
    public interface IKumojinEventService
    {
        Task<ICollection<KumojinEvent>> ListAsync();
        Task CreateAsync(KumojinEvent kumojinEvent);
    }

    public class KumojinEventService : IKumojinEventService
    {
        private readonly IKumojinEventRepository _kumojinEventRepository;

        public KumojinEventService(IKumojinEventRepository kumojinEventRepository)
        {
            _kumojinEventRepository = kumojinEventRepository;
        }

        public Task<ICollection<KumojinEvent>> ListAsync()
        {
            return _kumojinEventRepository.GetListAsync();
        }

        public async Task CreateAsync(KumojinEvent kumojinEvent)
        {
            await ValidateAsync(kumojinEvent);

            await MapDateToUTCAsync(kumojinEvent);
            await _kumojinEventRepository.InsertAsync(kumojinEvent);
        }

        private async Task ValidateAsync(KumojinEvent kumojinEvent)
        {
            var validator = new KumojinEventValidator();

            await validator.ValidateAndThrowAsync(kumojinEvent);
        }

        private Task MapDateToUTCAsync(KumojinEvent kumojinEvent)
        {
            kumojinEvent.StartAt = kumojinEvent.StartAt.ToUniversalTime();
            kumojinEvent.EndAt = kumojinEvent.EndAt.ToUniversalTime();

            return Task.CompletedTask;
        }
    }
}