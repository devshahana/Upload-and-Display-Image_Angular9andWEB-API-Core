using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SHop_Data.Models;

namespace SHop_Data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signinManager;
        public ApplicationUsersController(UserManager<ApplicationUser> userManager,
         SignInManager<ApplicationUser> signinManager)
        {
            this._userManager = userManager;
            this._signinManager = signinManager;

        }
        [HttpPost]
        //[Route("api/register")]
        public async Task<Object> PostRegister(ApplicationUserModel s)
        {
            var user = new ApplicationUser
            {
                Fullname = s.Fullname,
                UserName = s.Fullname,
                Email = s.Email


            };
            try
            {
                var result = await _userManager.CreateAsync(user, s.Password);
                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    foreach (var e in result.Errors)
                    {
                        ModelState.AddModelError("", e.Description);

                    }

                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                //return BadRequest();
                throw ex;
            }
            return BadRequest(user);
        }
        [HttpPost]
        [Route("login")]
        public async Task<Object> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new System.Security.Claims.ClaimsIdentity(new Claim[] {
                         new Claim("UserId",user.Id)
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey
                                                                (Encoding.UTF8.GetBytes("1234567887456321")),
                                                                 SecurityAlgorithms.HmacSha256Signature),

                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var secToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(secToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username  or password does mot match" });
            }
        }
            [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        [Route("profile")]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.Fullname,
                user.Email,
                user.UserName
            };
        }
    

    }
    } 