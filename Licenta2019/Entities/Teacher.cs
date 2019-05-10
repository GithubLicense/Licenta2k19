using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Teacher : BaseEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}
