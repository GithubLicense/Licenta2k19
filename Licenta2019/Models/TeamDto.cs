using System;
using System.Collections.Generic;

namespace Models
{
    public class TeamDto : BaseDto
    {
        public Guid Id { get; set; }

        public string GithubRepository { get; set; }

        public string GithubUsername { get; set; }

        public List<string> Teammates { get; set; }

    }
}
