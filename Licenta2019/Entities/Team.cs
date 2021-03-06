﻿using System;

namespace Entities
{
    public class Team : BaseEntity
    {
        public Project Project { get; set; }

        public Guid ProjectId { get; set; }

        public string GithubRepository { get; set; }

        public string GithubUsername { get; set; }
    }
}
