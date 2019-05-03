using System;

namespace Entities
{
    public class Evaluation : BaseEntity
    {
        public Team Team { get; set; }

        public Guid TeamId { get; set; }

        public string Type { get; set; }

        public string Grade { get; set; }

        public string Description { get; set; }
    }
}
