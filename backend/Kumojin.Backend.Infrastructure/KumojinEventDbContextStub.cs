using System;
using System.Collections.Generic;
using Kumojin.Backend.Domain.KumojinEvents;

namespace Kumojin.Backend.Infrastructure
{
    public static class KumojinEventDbContextStub
    {
        public static ICollection<KumojinEvent> KumojinEventsDbSet = new List<KumojinEvent>
        {
            new KumojinEvent
            {
                Id = 1,
                DisplayName = "Event Mock",
                Description = "This is the mock for an event on a test context",
                StartAt = new DateTime(2021, 12, 31, 14, 00, 00).ToUniversalTime(),
                EndAt =  new DateTime(2022, 01, 01, 14, 00, 00).ToUniversalTime(),
                CountryAt = "Mexico",
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                UpdatedAt = DateTime.UtcNow.AddDays(-1)
            }
        };
    }
}