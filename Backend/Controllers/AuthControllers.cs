using Backend.Common;
using Backend.DTOs.Auth;
using Backend.Models;
using Backend.Models.Enums;
using Backend.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenServices _tokenService;

    public AuthController(AppDbContext context, TokenServices tokenServices)
    {
        _context = context;
        _tokenService = tokenServices;
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
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };

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

            if (string.IsNullOrEmpty(email))
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
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("auth", token, cookieOptions);

            // return Redirect([])
            return Redirect("http://localhost:3000/dashboard");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<Object>.Fail(ex.Message));
        }
    }
}
