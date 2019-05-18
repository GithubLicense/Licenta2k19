using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Abstractions;
using DataAccess.Abstractions;
using Models;
using Octokit;

namespace BusinessLogic.Implementations
{
    public class StatisticsLogic : BaseLogic, IStatisticsLogic
    {

        public StatisticsLogic(IRepository repository) : base(repository)
        {
        }

        public RepositoryInformation GetProjectStatistics()
        {
            var client = new GitHubClient(new ProductHeaderValue("my-bachelor-degree"));
            var basicAuth = new Credentials("BogdanConstantin", "telemeacugustdomol97!!");
            client.Credentials = basicAuth;

            var repositoryInformation = new RepositoryInformation();

            var commits = client.Repository.Commit.GetAll("dinusergiuandrei", "easylearn").Result;

            var collaborators = client.Repository.Collaborator.GetAll("dinusergiuandrei", "easylearn").Result;

            //var codeFrequency = client.Repository.Statistics.GetCodeFrequency("dinusergiuandrei", "easylearn").Result;

            //var commitActivity = client.Repository.Statistics.GetCommitActivity("dinusergiuandrei", "easylearn").Result;

            var contributors = client.Repository.Statistics.GetContributors("dinusergiuandrei", "easylearn").Result;

            //var participation = client.Repository.Statistics.GetParticipation("dinusergiuandrei", "easylearn").Result;

            //var punchCard = client.Repository.Statistics.GetPunchCard("dinusergiuandrei", "easylearn").Result;  

            repositoryInformation.TotalNumberOfCommits = commits.Count;
            repositoryInformation.Collaborators = new List<GithubUser>();

            foreach (var contributor in contributors)
            {
                var user = new GithubUser
                {
                    UserName = contributor.Author.Login,
                    NumberOfCommits = contributor.Total
                };

                repositoryInformation.Collaborators.Add(user);
            }

            return repositoryInformation;
        }
    }
}
