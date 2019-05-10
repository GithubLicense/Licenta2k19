using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class TeacherDto : BaseDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
