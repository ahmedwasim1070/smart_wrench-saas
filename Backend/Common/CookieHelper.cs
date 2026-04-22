namespace Backend.Common;
using Microsoft.AspNetCore.Http;

public static class CookieHelper
{
    public static CookieOptions GetCookieOptions()
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        return cookieOptions;
    }
}