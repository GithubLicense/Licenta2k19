using System;
using System.Collections.Generic;
using System.Text;
using Entities;
using Models;

namespace BusinessLogic.Abstractions
{
    public interface IProjectLogic
    {
        Project Create(ProjectDto project, Guid courseId);

        ICollection<Project> GetByCourseId(Guid courseId);

        Project GetByProjectId(Guid projectId);
    }
}
