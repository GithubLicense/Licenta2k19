using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class SignUpUserDto : BaseDto
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
