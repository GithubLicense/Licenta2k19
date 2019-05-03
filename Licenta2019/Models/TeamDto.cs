using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class TeamDto : BaseDto
    {
        public string GithubRepository { get; set; }

        public string GithubUsername { get; set; }

        public List<string> Teammates { get; set; }

    }
}
