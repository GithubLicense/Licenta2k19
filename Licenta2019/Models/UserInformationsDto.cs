using System;

namespace Models
{
    public class UserInformationsDto : BaseDto
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Year { get; set; }

        public string Group { get; set; }
    }
}
