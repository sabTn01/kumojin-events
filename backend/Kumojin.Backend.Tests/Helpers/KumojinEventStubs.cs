using System;
using System.Collections.Generic;
using Kumojin.Backend.Domain.KumojinEvents;

namespace Kumojin.Backend.Tests.Helpers
{
    public static class KumojinEventStubs
    {
        public static List<KumojinEvent> Get_List_Stub()
        {
            return new List<KumojinEvent>
            {
                new KumojinEvent()
                {
                    DisplayName = "Event Mock",
                    Description = "This is the mock for an event on a test context",
                    StartAt = new DateTime(2021, 12, 31, 14, 00, 00),
                    EndAt = new DateTime(2022, 01, 01, 14, 00, 00),
                    CountryAt = "Mexico"
                }
            };
        }
    }
}