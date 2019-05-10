using BusinessLogic.Abstractions;
using DataAccess.Abstractions;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementations
{
    public class FileHandlerLogic : BaseLogic, IFilesHandlerLogic
    {

        public FileHandlerLogic(IRepository repository)
            : base(repository)
        {
        }

        public async Task<FilesMetadataDto> UploadFiles(Guid courseId, IFormFile file)
        {
            // full path to file in temp location
            FilesMetadataDto result = null;

            if (file.Length > 0)
            {
                var filePath = Path.GetTempFileName();

                // copy files to temp location for checking
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // check if files valid
                if (CheckFileValid(filePath))
                {
                    // create folder if it doesn't exists
                    if (!Directory.Exists("../files/" + courseId.ToString() + "/"))
                    {
                        Directory.CreateDirectory("../files/" + courseId.ToString() + "/");
                    }

                    var path = "../files/" + courseId.ToString() + "/";
                    // download files to server folder
                    using (var stream = new FileStream(path + file.FileName, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // create metadatas
                    result = new FilesMetadataDto
                    {
                        EntityId = Guid.NewGuid(),
                        CourseId = courseId,
                        Path = path,
                        FileName = file.FileName
                    };

                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }
                }
            }

            return result;
        }

        public bool CheckFileValid(string filePath)
        {
            if (filePath == null)
                return false;

            byte[] BMP = { 66, 77 };
            byte[] DOC = { 208, 207, 17, 224, 161, 177, 26, 225 };
            byte[] JPG = { 255, 216, 255 };
            byte[] PDF = { 37, 80, 68, 70, 45 };
            byte[] PNG = { 137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82 };
            byte[] RAR = { 82, 97, 114, 33, 26, 7, 0 };
            byte[] ZIP_DOCX = { 80, 75, 3, 4 };

            FileStream stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            BinaryReader reader = new BinaryReader(stream);
            byte[] file = null;
            file = reader.ReadBytes(32);
            reader.Close();
            stream.Close();

            if (file.Take(2).SequenceEqual(BMP))
            {
                return true;
            }
            else if (file.Take(8).SequenceEqual(DOC))
            {
                return true;
            }
            else if (file.Take(3).SequenceEqual(JPG))
            {
                return true;
            }
            else if (file.Take(5).SequenceEqual(PDF))
            {
                return true;
            }
            else if (file.Take(16).SequenceEqual(PNG))
            {
                return true;
            }
            else if (file.Take(7).SequenceEqual(RAR))
            {
                return true;
            }
            else if (file.Take(4).SequenceEqual(ZIP_DOCX))
            {
                return true;
            }

            return false;
        }

        public FileMetadata Create(FilesMetadataDto fileMetadataDto)
        {
            var newFileMetadata = new FileMetadata
            {
                CourseId = fileMetadataDto.CourseId,
                Path = fileMetadataDto.Path,
                FileName = fileMetadataDto.FileName
            };

            _repository.Insert(newFileMetadata);
            _repository.Save();

            return newFileMetadata;
        }


        public FilesMetadataDto GetById(Guid fileEntityId)
        {
            var file = _repository.GetLastByFilter<FileMetadata>(f => f.Id == fileEntityId);

            var fileDto = new FilesMetadataDto
            {
                EntityId = file.Id,
                CourseId = file.CourseId,
                Path = file.Path,
                FileName = file.FileName
            };

            return fileDto;
        }

        public ICollection<FilesMetadataDto> GetByCourseId(Guid courseEntityId)
        {
            List<FilesMetadataDto> fileDtos = new List<FilesMetadataDto>();

            var files = _repository.GetAll<FileMetadata>();

            foreach (var file in files)
            {
                if (file.CourseId == courseEntityId)
                {
                    var fileDto = new FilesMetadataDto
                    {
                        EntityId = file.Id,
                        CourseId = file.CourseId,
                        Path = file.Path,
                        FileName = file.FileName
                    };

                    fileDtos.Add(fileDto);
                }
            }

            return fileDtos;
        }

        public ICollection<FilesMetadataDto> GetAll()
        {
            List<FilesMetadataDto> fileDtos = new List<FilesMetadataDto>();

            var files = _repository.GetAll<FileMetadata>();

            foreach (var file in files)
            {
                var fileDto = new FilesMetadataDto
                {
                    EntityId = file.Id,
                    CourseId = file.CourseId,
                    Path = file.Path,
                    FileName = file.FileName
                };

                fileDtos.Add(fileDto);
            }

            return fileDtos;
        }

        public FileStreamResult GetFile(Guid fileEntityId, ControllerBase controller)
        {
            var metadata = GetById(fileEntityId);

            if (metadata == null)
                return null;

            Stream stream = new FileStream(metadata.Path + metadata.FileName, FileMode.Open);

            if (stream == null)
                return null;

            return controller.File(stream, "application/octet-stream", metadata.FileName);
        }
    }
}
