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
    }
}
