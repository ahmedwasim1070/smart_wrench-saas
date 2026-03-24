using Backend.Models.Enums;
using Backend.Models.Interfaces;

namespace Backend.Models;

public class User : IAuditable
{
    public int Id { get; set; }

    public Guid PublicId { get; set; } = Guid.NewGuid();

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? PasswordHash { get; set; } = string.Empty;

    public AuthProviders Provider { get; set; } = AuthProviders.Local;

    public string? ProviderId { get; set; } = string.Empty;

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}