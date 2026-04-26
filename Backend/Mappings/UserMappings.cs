using Backend.DTOs.Auth;
using Backend.Models;

namespace Backend.Mappings;

public static class UserMappings
{
    public static UserResponseDto ToDto(this User user)
    {
        return new UserResponseDto
        (
            user.PublicId,
            user.FullName,
            user.Email,
            user.Provider
        );
    }
}