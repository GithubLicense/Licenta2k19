using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class RepositoryInformation
    {
        public int TotalNumberOfCommits { get; set; }

        public ICollection<GithubUser> Collaborators { get; set; }
    }
}
