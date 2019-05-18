using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class GithubUser
    {
        public string UserName { get; set; }

        public int NumberOfCommits { get; set; }

        public int NumberOfAddedLines { get; set; }

        public int NumberOfDeletedLines { get; set; }
    }
}
