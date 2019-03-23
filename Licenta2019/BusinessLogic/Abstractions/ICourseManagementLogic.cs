using System;
using System.Collections.Generic;
using Entities;
using Models;

namespace BusinessLogic.Abstractions
{
    public interface ICourseManagementLogic
    {
        CourseManagement Create(CourseManagementDto courseManagementDto);

        CourseManagement Update(CourseManagementDto courseManagementDto, Guid courseManagementEntityId);

        CourseManagement Delete(Guid courseManagementEntityId);

        CourseManagementDto GetById(Guid courseManagementEntityId);

        ICollection<CourseManagementDto> GetAll();
    }
}
