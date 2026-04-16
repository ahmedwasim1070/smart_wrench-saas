namespace Backend.Services;

public class CookieService
{
    public CookieOptions GetCookieOptions()
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