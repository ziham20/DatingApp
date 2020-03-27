using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;

        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            //get cloudinary values from the app settings
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
                );

            //creates a cloudinary setup with the accDetails
            _cloudinary = new Cloudinary(acc);

        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            //get photo
            var photoFromRepo = await _repo.GetPhoto(id);
            //map photo to output photo object
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            
            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            //check if the user id attempting update is a part of the token
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            //get user
            var userFromRepo = await _repo.GetUser(userId);

            //get the actual file
            var file = photoForCreationDto.File;

            //results from cloudinary
            var uploadResult = new ImageUploadResult();

            //check if theres a file or not
            if (file.Length > 0)
            {
                //read the file to memmory
                using (var stream = file.OpenReadStream()) 
                {
                    //create cloudinary upload params
                    var uploadParams = new ImageUploadParams()
                    {
                        //get file
                        File = new FileDescription(file.Name, stream),
                        //tranform the large image to square size
                        Transformation = new Transformation()
                                .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    //upload results from cloudinary
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
               
            }

            //filling the fields
            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            //mapping the values
            var photo = _mapper.Map<Photo>(photoForCreationDto);

            //if users doesnt have any photo make it as main photo
            if (!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            //adding the photo
            userFromRepo.Photos.Add(photo);          

            //saves the photo
            if (await _repo.SaveAll())
            {
                //this photo variable wont have an id if we use this outside this if statement
                //once it saved properly it will return an id
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");

        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id) 
        {
            //check if the user id attempting update is a part of the token
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            //get user
            var userFromRepo = await _repo.GetUser(userId);
            //
            if (!userFromRepo.Photos.Any(p => p.Id == id))
                return Unauthorized();
            //get photo
            var photoFromRepo = await _repo.GetPhoto(id);
            //check if the selected photo is main
            if (photoFromRepo.IsMain)
                return BadRequest("This is already the main photo");
            //get current main photo
            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            //set current main photo to false
            currentMainPhoto.IsMain = false;
            //set user selected photo to true
            photoFromRepo.IsMain = true;
            //save
            if (await _repo.SaveAll())
                return NoContent();
            
            return BadRequest("Could not set photo to main");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id) {
            //check if the user id attempting update is a part of the token
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            //get user
            var userFromRepo = await _repo.GetUser(userId);
            //
            if (!userFromRepo.Photos.Any(p => p.Id == id))
                return Unauthorized();
            //get photo
            var photoFromRepo = await _repo.GetPhoto(id);
            //check if the selected photo is main
            if (photoFromRepo.IsMain)
                return BadRequest("you cannot delete your main photo");

            if (photoFromRepo.PublicID != null) 
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicID);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                }
            }

            if (photoFromRepo.PublicID == null)
            {
                _repo.Delete(photoFromRepo);
            }

            //save
            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Failed to delete the photo");
        }

    }
}