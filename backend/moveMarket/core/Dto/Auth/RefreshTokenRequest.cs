namespace core.Dto.Auth;

public record RefreshTokenRequest(string AccessToken, string RefreshToken);