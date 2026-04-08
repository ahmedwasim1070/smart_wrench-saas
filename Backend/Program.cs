using Backend.Common;
using Backend.Models.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// Globals
var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Builder 
// API map generator 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add the required things to understand controllers !
builder.Services.AddControllers();
// For Databse - and also for passing the required configs like connection stirng
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(config.GetConnectionString("DefaultConnection"))
           .UseSnakeCaseNamingConvention());
// Authentication Configuration - for zero auth
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";
    options.DefaultChallengeScheme = "Google";
})
.AddCookie("Cookies")
.AddGoogle("Google", options =>
{
    options.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
});

// Custom Confgis
// Project Propertise - name,url and all
builder.Services.Configure<ProjectSettings>(
    config.GetSection("ProjectSettings")
);
// For fetching all kinds of  errors and parsing them in a custom structured response
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
