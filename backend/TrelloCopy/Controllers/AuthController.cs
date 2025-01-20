using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TrelloCopy.Models;
using TrelloCopy.Services;

namespace TrelloCopy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<SiteUser> _userManager;
        private readonly SignInManager<SiteUser> _signInManager;
        private readonly IJwtService _jwtService;

        public AuthController(
            UserManager<SiteUser> userManager,
            SignInManager<SiteUser> signInManager,
            IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new AuthResponse { Success = false, Message = "Invalid input" });

            var user = new SiteUser
            {
                UserName = model.Email,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new AuthResponse
                {
                    Success = true,
                    Message = "Registration successful",
                    Email = user.Email,
                    Token = _jwtService.GenerateToken(user)
                });
            }

            return BadRequest(new AuthResponse
            {
                Success = false,
                Message = string.Join(", ", result.Errors.Select(e => e.Description))
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new AuthResponse { Success = false, Message = "Invalid input" });

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized(new AuthResponse { Success = false, Message = "Invalid credentials" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (result.Succeeded)
            {
                return Ok(new AuthResponse
                {
                    Success = true,
                    Message = "Login successful",
                    Email = user.Email,
                    Token = _jwtService.GenerateToken(user)
                });
            }

            return Unauthorized(new AuthResponse { Success = false, Message = "Invalid credentials" });
        }
    }
}
