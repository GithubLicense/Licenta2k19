using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Abstractions
{
    public interface IFilesHandlerLogic
    {
        Task<FilesMetadataDto> UploadFiles(Guid courseId, IFormFile file);

        FileMetadata Create(FilesMetadataDto fileMetadataDto);

        FilesMetadataDto GetById(Guid fileEntityId);

        ICollection<FilesMetadataDto> GetByCourseId(Guid courseEntityId);

        ICollection<FilesMetadataDto> GetAll();

        bool CheckFileValid(string filePath);

        FileStreamResult GetFile(Guid fileEntityId, ControllerBase controller);
    }
}
