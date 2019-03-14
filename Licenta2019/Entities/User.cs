using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Year { get; set; }

        public string Group { get; set; }

        public UserPosition UserPosition { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }
    }
}
