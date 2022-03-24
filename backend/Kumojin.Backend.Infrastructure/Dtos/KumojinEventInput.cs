using System;

namespace Kumojin.Backend.Infrastructure.Dtos
{
    public class KumojinEventInput
    {
        public string DisplayName { get; set; }
        public string Description { get; set; }

        public DateTime StartAt { get; set; }
        public DateTime EndAt { get; set; }

        public string CountryAt { get; set; }
    }
}