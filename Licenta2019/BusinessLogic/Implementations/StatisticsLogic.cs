using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Abstractions;
using DataAccess.Abstractions;
using Models;
using Octokit;

namespace BusinessLogic.Implementations
{
    using System.Linq;

    using Entities;

    public class StatisticsLogic : BaseLogic, IStatisticsLogic
    {

        public StatisticsLogic(IRepository repository) : base(repository)
        {
        }

        public RepositoryInformation GetProjectStatistics(Guid teamId)
        {
            var client = new GitHubClient(new ProductHeaderValue("my-bachelor-degree"));
            var basicAuth = new Credentials("BogdanConstantin", "telemeacugustdomol97!!");
            client.Credentials = basicAuth;

            var team = this._repository.GetLastByFilter<Team>(c => c.Id == teamId);

            var repositoryInformation = new RepositoryInformation();

            var commits = client.Repository.Commit.GetAll(team.GithubUsername, team.GithubRepository).Result;

            var contributors = client.Repository.Statistics.GetContributors(team.GithubUsername, team.GithubRepository).Result;

            var codeFrequency = client.Repository.Statistics.GetCodeFrequency(team.GithubUsername, team.GithubRepository).Result;

            var commitActivity = client.Repository.Statistics.GetCommitActivity(team.GithubUsername, team.GithubRepository).Result;

            int totalCommits = 0;
            repositoryInformation.TotalNumberOfCommits = commits.Count;
            repositoryInformation.Collaborators = new List<GithubUser>();
            repositoryInformation.CodeFrequency = new List<CodeFrequencyDto>();
            repositoryInformation.DayStatistics = new List<CommitDayStatisticsDto>();
            repositoryInformation.CollaboratorsCodeFrequency = new List<CollaboratorsCodeFrequencyDto>();

            foreach (var contributor in contributors)
            {
                int additions = 0;
                int deletions = 0;

                foreach (var contributorWeek in contributor.Weeks)
                {
                    additions += contributorWeek.Additions;
                    deletions += contributorWeek.Deletions;
                }
                var user = new GithubUser
                {
                    UserName = contributor.Author.Login,
                    NumberOfCommits = contributor.Total,
                    NumberOfAddedLines = additions,
                    NumberOfDeletedLines = deletions
                };

                repositoryInformation.Collaborators.Add(user);
            }

            foreach (var codeFreq in codeFrequency.AdditionsAndDeletionsByWeek)
            {
                if (codeFreq.Additions != 0 || codeFreq.Deletions != 0)
                {
                    var frequecyDetails = new CodeFrequencyDto
                    {
                        Additions = codeFreq.Additions,
                        Day = codeFreq.Timestamp.DateTime,
                        Deletions = codeFreq.Deletions
                    };
                    repositoryInformation.CodeFrequency.Add(frequecyDetails);
                }
            }

            foreach (var activity in commitActivity.Activity)
            {
                for (int i = 0; i < activity.Days.Count; i++)
                {
                    if (activity.Days[i] != 0)
                    {
                        bool found = false;
                        foreach (var dayStatistic in repositoryInformation.DayStatistics)
                        {
                            if (dayStatistic.Day == Enum.GetName(typeof(DaysOfTheWeek), i).ToString())
                            {
                                found = true;
                                dayStatistic.NumberOfCommits += activity.Days[i];
                                totalCommits += activity.Days[i];
                            }
                        }

                        if (!found)
                        {
                            var dayStatistics = new CommitDayStatisticsDto
                            {
                                Day = Enum.GetName(typeof(DaysOfTheWeek), i).ToString(),
                                NumberOfCommits = activity.Days[i]
                            };
                            totalCommits += activity.Days[i];
                            repositoryInformation.DayStatistics.Add(dayStatistics);
                        }
                    }
                }
            }

            foreach (var dayStatistic in repositoryInformation.DayStatistics)
            {
                dayStatistic.Percentage = (double) dayStatistic.NumberOfCommits / totalCommits * 100;
            }

            foreach (var collaborator in repositoryInformation.Collaborators)
            {


                var listCodeFq = new List<CodeFrequencyDto>();

                for (int i = 1; i < repositoryInformation.CodeFrequency.Count; i++)
                {
                    int additionsUser = 0;
     
                    foreach (var commit in commits)
                    {
                        if (commit.Author != null && commit.Author.Login == collaborator.UserName
                            && commit.Commit.Author.Date.DateTime.Date
                            >= repositoryInformation.CodeFrequency.ElementAt(i - 1).Day.Date
                            && commit.Commit.Author.Date.DateTime.Date
                            <= repositoryInformation.CodeFrequency.ElementAt(i).Day.Date)
                        {
                            additionsUser++;
                        }
                    }

                    var codeFq = new CodeFrequencyDto
                                     {
                                         Additions = additionsUser,
                                         Deletions = 0,
                                         Day = repositoryInformation.CodeFrequency.ElementAt(i - 1).Day
                                     };

                    listCodeFq.Add(codeFq);

                }

                var collaboratorCodeFreq =
                    new CollaboratorsCodeFrequencyDto
                        {
                            userCodeFrequency = listCodeFq,
                            Username = collaborator.UserName
                        };

                repositoryInformation.CollaboratorsCodeFrequency.Add(collaboratorCodeFreq);

            }


            return repositoryInformation;
        }
    }
}
