using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class SignUpAdminDto: BaseDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
