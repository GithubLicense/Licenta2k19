using System;
using System.Collections.Generic;
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

        public bool CheckProjectAssigned(Guid courseId, Guid userId)
        {
            var teamMembers = _repository.GetAllByFilter<TeamMember>(c => c.MemberId == userId);

            if (teamMembers == null)
            {
                return false;
            }

            foreach (var teamMember in teamMembers)
            {
                var team = _repository.GetLastByFilter<Team>(c => c.Id == teamMember.TeamId);

                if (team == null)
                {
                    return false;
                }

                var project = _repository.GetLastByFilter<Project>(c => c.Id == team.ProjectId);

                if (project != null && project.CourseId == courseId)
                {
                    return true;
                }
            }

            return false;
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

        public Evaluation CreateEvaluation(EvalutionDto evaluationDto, Guid teamId)
        {
            Evaluation evaluation = new Evaluation
            {
                TeamId = teamId,
                Type = evaluationDto.Type,
                Grade = evaluationDto.Grade,
                Description = evaluationDto.Description
            };

            _repository.Insert(evaluation);
            _repository.Save();

            return evaluation;
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

        public ICollection<EvalutionDto> GetEvalutions(Guid userId, Guid courseId)
        {
            ICollection<Evaluation> evaluations = new List<Evaluation>();
            ICollection<EvalutionDto> evalutionDtos = new List<EvalutionDto>();

            var teamMembers = _repository.GetAllByFilter<TeamMember>(c => c.MemberId == userId);

            foreach (var teamMember in teamMembers)
            {
                var team = _repository.GetLastByFilter<Team>(c => c.Id == teamMember.TeamId);

                var project = _repository.GetLastByFilter<Project>(c => c.Id == team.ProjectId);

                if (project != null && project.CourseId == courseId)
                {
                    evaluations = _repository.GetAllByFilter<Evaluation>(c => c.TeamId == team.Id);
                }
            }

            foreach (var evaluation in evaluations)
            {
                var evaluationDto = new EvalutionDto
                {
                    Description = evaluation.Description,
                    Grade = evaluation.Grade,
                    Type = evaluation.Type
                };

                evalutionDtos.Add(evaluationDto);
            }

            return evalutionDtos;

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
                    Id = team.Id,
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
