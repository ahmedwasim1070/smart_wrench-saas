namespace Backend.DTOs.Auth;

public record SignupResponseDto(
    string FullName,
    string Email
);