﻿namespace Models
{
    public class UserAuthenticationDto : BaseDto
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
