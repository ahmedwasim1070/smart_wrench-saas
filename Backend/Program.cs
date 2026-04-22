using Backend.Common;
using Backend.Models.Settings;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// Globals
var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Builder 
// API map generator 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Controller
builder.Services.AddControllers();
// Register Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(config.GetConnectionString("DefaultConnection"))
           .UseSnakeCaseNamingConvention());
// Register services
builder.Services.Configure<ProjectSettings>(
    config.GetSection("ProjectSettings")
);
builder.Services.Configure<JwtSettings>(
    config.GetSection("Jwt")
);
builder.Services.AddScoped<TokenServices>();

// Authentication Configuration - for zero auth and jwt validation
builder.Services.AddAuthentication(options =>
{
    // We want APIs to use JwtBearer by default for authentication
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddCookie("Cookies")
.AddGoogle("Google", options =>
{
    options.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
    options.SignInScheme = "Cookies";
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = config["Jwt:Issuer"],
        ValidateAudience = true,
        ValidAudience = config["Jwt:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!)),
        ValidateLifetime = true
    };
    
    // Tell JwtBearer to read the token from our custom cookie named "auth"
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.Request.Cookies.ContainsKey("auth"))
            {
                context.Token = context.Request.Cookies["auth"];
            }
            return Task.CompletedTask;
        }
    };
});

// Custom Confgis
// PascalCase to snake_case - automate the process to follow the standard casing for db and the framework
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context.ModelState
            .Where(e => e.Value?.Errors.Count > 0)
            .SelectMany(x => x.Value!.Errors)
            .Select(x => x.ErrorMessage)
            .ToList();

        var errorString = string.Join("; ", errors);

        var response = ApiResponse<object>.Fail(errorString);

        return new BadRequestObjectResult(response);
    };
});

var app = builder.Build();

// For Dev Environment
if (app.Environment.IsDevelopment())
{
    // For swagger ui
    app.UseSwagger();
    app.UseSwaggerUI();
}

// request protocol upgrade if available
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Scan files & folder to find routes
app.MapControllers();

app.Run();
