using BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;

namespace Service.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/profile")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailLogic _emailLogic;

        public EmailController(IEmailLogic emailLogic)
        {
            _emailLogic = emailLogic;
        }

        [HttpPost("{userId:guid}/send-email")]
        public IActionResult Create([FromRoute] Guid userId, [FromBody] EmailDto emailDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var email = _emailLogic.Create(userId, emailDto);

            return Ok(email);
        }

        [HttpGet("{emailId:guid}")]
        public IActionResult GetById([FromRoute] Guid emailId)
        {
            var result = _emailLogic.GetById(emailId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet]
        public ICollection<EmailDto> GetAll()
        {
            var emails = _emailLogic.GetAll();

            return emails;
        }
    }
}
