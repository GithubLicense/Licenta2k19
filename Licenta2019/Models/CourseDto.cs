using System;

namespace Models
{
    public class CourseDto : BaseDto
    {

        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Year { get; set; }

        public int Semester { get; set; }
    }
}
