using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class UserDto : BaseDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Year { get; set; }

        public string Group { get; set; }

        public string Email { get; set; }

    }
}
