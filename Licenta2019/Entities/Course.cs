using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Course : BaseEntity
    {
        public string Name { get; set; }

        public int Year { get; set; }

        public int Semester { get; set; }
    }
}
