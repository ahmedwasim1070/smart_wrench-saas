namespace Backend.DTOs.Auth;

public record SignupRequestDto(
    string FullName,
    string Email,
    string Password,
    string ConfirmPassword
);