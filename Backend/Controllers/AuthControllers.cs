using Backend.Common;
using Backend.DTOs.Auth;
using Backend.Models;
using Backend.Models.Enums;
using Backend.Models.Settings;
using Backend.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace Backend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenServices _tokenService;
    private readonly ProjectSettings _projectSettings;

    public AuthController(IOptions<ProjectSettings> options, AppDbContext context, TokenServices tokenServices)
    {
        _context = context;
        _tokenService = tokenServices;
        _projectSettings = options.Value;
    }

    [HttpPost("signup")]
    public async Task<ActionResult<ApiResponse<Object>>> Signup(SignupRequestDto request)
    {
        try
        {
            var user = await _context.Users.AnyAsync(u => u.Email == request.Email);
            if (user)
                return Conflict(ApiResponse<Object>.Fail("Email already in use."));

            if (request.Password != request.ConfirmPassword)
                return BadRequest(ApiResponse<Object>.Fail("Password and Confirm Password does not match."));

            var newUser = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                Provider = AuthProviders.Local,
                ProviderId = null
            };

            var passwordHasher = new PasswordHasher<User>();
            newUser.PasswordHash = passwordHasher.HashPassword(newUser, request.Password);

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(ApiResponse<Object>.Ok(null, "Successfully Created User."));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<Object>.Fail(ex.Message));
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<Object>>> Login(LoginRequestDto request)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return NotFound(ApiResponse<Object>.Fail("User not found."));

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash!, request.Password);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized(ApiResponse<Object>.Fail("Check your email or password and try again."));

            var token = _tokenService.CreateToken(user);
            var cookieOptions = CookieHelper.GetCookieOptions();

            Response.Cookies.Append("auth", token, cookieOptions);
            return Ok(ApiResponse<Object>.Ok(null, "Successfully Logged In."));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<Object>.Fail(ex.Message));
        }
    }

    [HttpGet("google")]
    public IActionResult GoogleAuth()
    {
        var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
        return Challenge(properties, "Google");
    }

    [HttpGet("google-response")]
    public async Task<IActionResult> GoogleResponse()
    {
        try
        {
            var result = await HttpContext.AuthenticateAsync("Cookies");
            if (!result.Succeeded)
                return BadRequest(ApiResponse<Object>.Fail("Google Authentication Failed."));

            var email = result.Principal.FindFirst(ClaimTypes.Email)?.Value;
            var name = result.Principal.FindFirst(ClaimTypes.Name)?.Value;
            var providerId = result.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(providerId))
                return BadRequest(ApiResponse<Object>.Fail("Could not retrive email from Google."));

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                user = new User
                {
                    FullName = name ?? "Google User",
                    Email = email,
                    Provider = AuthProviders.Google,
                    ProviderId = providerId,
                    PasswordHash = null
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            var token = _tokenService.CreateToken(user);
            var cookieOptions = CookieHelper.GetCookieOptions();

            Response.Cookies.Append("auth", token, cookieOptions);
            return Redirect($"{_projectSettings.Url}/dashboard");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<Object>.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<ApiResponse<Object>>> Me()
    {
        try
        {
            // Extract the user's PublicId (Subject) from the JWT token claims
            var publicIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(publicIdString))
                return Unauthorized(ApiResponse<Object>.Fail("Invalid Token."));

            if (!Guid.TryParse(publicIdString, out Guid publicId))
                return BadRequest(ApiResponse<Object>.Fail("Invalid User ID format."));

            // Fetch the user from the database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.PublicId == publicId);
            
            if (user == null)
                return NotFound(ApiResponse<Object>.Fail("User not found."));

            // Note: Never return the PasswordHash to the frontend!
            var userDto = new
            {
                user.PublicId,
                user.FullName,
                user.Email,
                user.Provider,
                user.CreatedAt
            };

            return Ok(ApiResponse<Object>.Ok(userDto, "User data retrieved successfully."));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<Object>.Fail(ex.Message));
        }
    }
}