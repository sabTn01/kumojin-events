using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Kumojin.Backend.Application.Events;
using Kumojin.Backend.Domain.KumojinEvents;
using Kumojin.Backend.Infrastructure.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Kumojin.Backend.Web.Controllers
{
    [Route("api/events")]
    public class EventController : ControllerBase
    {
        private IKumojinEventService _kumojinEventService;
        private IMapper _mapper;

        public EventController(IKumojinEventService kumojinEventService,
            IMapper mapper)
        {
            _kumojinEventService = kumojinEventService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ICollection<KumojinEventOutputView>> List()
        {
            var events = await _kumojinEventService.ListAsync();

            var mapped = _mapper.Map(events, new List<KumojinEventOutputView>());

            return mapped;
        }

        [HttpPost]
        public async Task Create([FromBody] KumojinEventInput input)
        {
            var mapped = _mapper.Map(input, new KumojinEvent());

            await _kumojinEventService.CreateAsync(mapped);
        }
    }
}