using System;

namespace Models
{
    public class CourseManagementDto : BaseDto
    {
        public Guid CourseId { get; set; }

        public Guid UserId { get; set; }
    }
}
