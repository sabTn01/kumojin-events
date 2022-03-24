using System;

namespace Kumojin.Backend.Domain.Bases
{
    public class BaseModel
    {
        public int Id { get; set; } = 0;
        public Guid Guid { get; set; } = Guid.NewGuid();

        public bool IsSoftDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public bool IsNewEntity()
        {
            return Id == 0;
        }
    }
}