using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class RepositoryInformation
    {
        public int TotalNumberOfCommits { get; set; }

        public ICollection<GithubUser> Collaborators { get; set; }

        public ICollection<CodeFrequencyDto> CodeFrequency { get; set; }

        public ICollection<CommitDayStatisticsDto> DayStatistics { get; set; }

        public ICollection<CollaboratorsCodeFrequencyDto> CollaboratorsCodeFrequency { get; set; }

    }
}
