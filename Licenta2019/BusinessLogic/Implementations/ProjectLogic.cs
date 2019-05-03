using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Abstractions;
using DataAccess.Abstractions;
using Entities;
using Models;

namespace BusinessLogic.Implementations
{
    public class ProjectLogic : BaseLogic, IProjectLogic
    {
        public ProjectLogic(IRepository repository) : base(repository)
        {
        }

        public Project Create(ProjectDto projectDto, Guid courseId)
        {
            Project project = new Project
            {
                CourseId = courseId,
                Code = projectDto.Code,
                Name = projectDto.Name,
                Description = projectDto.Description,
                NumberOfMembers = projectDto.NumberOfMembers,
                NumberOfTeams = projectDto.NumberOfTeams,
                MaxGrade = projectDto.MaxGrade
            };

            _repository.Insert(project);
            _repository.Save();

            return project;
        }

        public Team CreateTeam(TeamDto teamDto, Guid projectId)
        {
            Team team = new Team
            {
                ProjectId = projectId,
                GithubRepository = teamDto.GithubRepository,
                GithubUsername = teamDto.GithubUsername
            };

            _repository.Insert(team);

            foreach (var teammate in teamDto.Teammates)
            {
                TeamMember teamMember = new TeamMember
                {
                    MemberId = Guid.Parse(teammate),
                    TeamId = team.Id
                };
                _repository.Insert(teamMember);
            }

            _repository.Save();

            return team;
        }

        public ICollection<Project> GetByCourseId(Guid courseId)
        {
            var projects = _repository.GetAllByFilter<Project>(c => c.CourseId == courseId);

            return projects;
        }

        public Project GetByProjectId(Guid projectId)
        {
            var project = _repository.GetLastByFilter<Project>(c => c.Id == projectId);

            return project;
        }

        public int GetProjectYear(Guid projectId)
        {
            var project = _repository.GetLastByFilter<Project>(c => c.Id == projectId);

            var course = _repository.GetLastByFilter<Course>(c => c.Id == project.CourseId);

            return course.Year;
        }

        public ICollection<TeamDto> GetTeamsByProjectId(Guid projectId)
        {
            ICollection<TeamDto> teamsDtos = new List<TeamDto>();
            var teams = _repository.GetAllByFilter<Team>(c => c.ProjectId == projectId);

            foreach (var team in teams)
            {
                var teammates = new List<string>();
                var teamMembers =  _repository.GetAllByFilter<TeamMember>(c => c.TeamId == team.Id);
                foreach (var teamMember in teamMembers)
                {
                    var user = _repository.GetLastByFilter<User>(c => c.Id == teamMember.MemberId);
                    teammates.Add(user.FirstName + ' ' + user.LastName);
                }

                var teamDto = new TeamDto
                {
                    GithubRepository = team.GithubRepository,
                    GithubUsername = team.GithubUsername,
                    Teammates = teammates
                };
               teamsDtos.Add(teamDto);
            }

            return teamsDtos;
        }
    }
}
