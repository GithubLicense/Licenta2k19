using System;
using System.Collections.Generic;
using Entities;
using Models;

namespace BusinessLogic.Abstractions
{
    public interface IProjectLogic
    {
        Project Create(ProjectDto project, Guid courseId);

        ICollection<Project> GetByCourseId(Guid courseId);

        Project GetByProjectId(Guid projectId);

        int GetProjectYear(Guid projectId);

        Team CreateTeam(TeamDto teamDto, Guid projectId);

        ICollection<TeamDto> GetTeamsByProjectId(Guid projectId);

        Evaluation CreateEvaluation(EvalutionDto evaluationDto, Guid teamId);
    }
}
