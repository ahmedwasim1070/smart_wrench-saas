using Backend.Models.Enums;

namespace Backend.DTOs.Auth;

public record UserResponseDto(
    Guid PublicId,
    string FullName,
    string Email,
    AuthProviders Provider
);