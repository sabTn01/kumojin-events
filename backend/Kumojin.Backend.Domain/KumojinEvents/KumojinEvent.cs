using System;
using System.ComponentModel.DataAnnotations;
using Kumojin.Backend.Domain.Bases;

namespace Kumojin.Backend.Domain.KumojinEvents
{
    public class KumojinEvent : BaseModel
    {
        [MaxLength(32)]
        public string DisplayName { get; set; }
        public string Description { get; set; }

        public DateTime StartAt { get; set; }
        public DateTime EndAt { get; set; }

        public string CountryAt { get; set; }
    }
}