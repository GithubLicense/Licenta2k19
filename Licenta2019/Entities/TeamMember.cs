using System;

namespace Entities
{
    public class TeamMember : BaseEntity
    {
        public Team Team { get; set; }

        public Guid TeamId { get; set; }

        public Guid MemberId { get; set; }
    }
}
