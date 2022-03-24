using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kumojin.Backend.Domain.KumojinEvents;
using Kumojin.Backend.Infrastructure.Bases;

namespace Kumojin.Backend.Infrastructure.KumojinEvents
{
    public interface IKumojinEventRepository : IAsyncRepository<KumojinEvent>
    {
    }

    /// <summary>
    /// This Class is used to interact with Data.
    /// We used a simple list to save data in because the test contest.
    /// For persistence, on a real world, we need to implement a DbContext. 
    /// </summary>
    public class KumojinEventRepository : IKumojinEventRepository
    {
        // todo - implement persistence with a DbContext
        public ICollection<KumojinEvent> kumojinEvents = KumojinEventDbContextStub.KumojinEventsDbSet;

        /// <summary>
        /// Insert a new entity for Kumojin Event on a list
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public Task InsertAsync(KumojinEvent entity)
        {
            kumojinEvents.Add(entity);

            return Task.CompletedTask;
        }

        /// <summary>
        /// Return the saved List of kumojin Events
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public Task<ICollection<KumojinEvent>> GetListAsync()
        {
            return Task.FromResult(kumojinEvents);
        }
    }
}