using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace AdminService.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/courses/manage")]
    [ApiController]
    public class CourseManagementController : ControllerBase
    {
        private readonly ICourseManagementLogic _managementLogic;

        public CourseManagementController(ICourseManagementLogic managementLogic)
        {
            _managementLogic = managementLogic;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CourseManagementDto managementDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCourseManagement = _managementLogic.Create(managementDto);

            return CreatedAtAction(nameof(GetById), new {CourseManagementId = newCourseManagement.Id},
                managementDto);

        }

        [HttpPut("{courseManagementId:guid}")]
        public IActionResult Update([FromBody] CourseManagementDto managementDto, [FromRoute] Guid courseManagementId)
        {
            var result = _managementLogic.Update(managementDto, courseManagementId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("{courseManagementId:guid}")]
        public IActionResult Delete([FromRoute] Guid courseManagementId)
        {
            var result = _managementLogic.Delete(courseManagementId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{courseManagementId:guid}")]
        public IActionResult GetById([FromRoute] Guid courseManagementId)
        {
            var result = _managementLogic.GetById(courseManagementId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        public ICollection<CourseManagementDto> GetAll()
        {
            var coursesManagements = _managementLogic.GetAll();

            return coursesManagements;
        }
    }
}
