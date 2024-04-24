namespace core.Dto.Auth;

public record RefreshTokenResponse(Guid UserId,
    string Login,
    string? UserName,
    string AccessToken, 
    string RefreshToken,
    long AccessTokenLifetimeSeconds, 
    long RefreshTokenLifetimeSeconds);