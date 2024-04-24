namespace core.Dto.Auth;

public record CreateUserResponse(Guid UserId,
   string Login,
    string? UserName,  
    string AccessToken,
    string RefreshToken,
    long AccessTokenLifetimeSeconds, 
    long RefreshTokenLifetimeSeconds);