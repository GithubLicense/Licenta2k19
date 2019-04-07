using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Service.Controllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/v{version:apiVersion}/profile")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectLogic _projectLogic;

        public ProjectController(IProjectLogic projectLogic)
        {
            _projectLogic = projectLogic;
        }

        [HttpPost("{courseId:guid}/add-project")]
        public IActionResult Create([FromBody] ProjectDto projectDto, [FromRoute] Guid courseId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newProject = _projectLogic.Create(projectDto, courseId);

            return Ok();

            //return CreatedAtAction(nameof(GetById), new { courseId = newCourse.Id }, courseDto);
        }
    }
}
