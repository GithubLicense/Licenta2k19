using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class CourseManagement : BaseEntity
    {
        public Course Course { get; set; }

        public Guid CourseId { get; set; }

        public Guid UserId { get; set; }
    }
}
