using core.Dto.Auth;
using core.Exceptions.Base;

namespace services.Exceptions.User;

public class UserUnauthorizedException : UnauthorizedException
{
    public UserUnauthorizedException(LoginRequest request) : base("Wrong password")
    {
        ExceptionObject = request;
    }    
    
    public UserUnauthorizedException(RefreshTokenRequest request) : base("Wrong access or refresh token")
    {
        ExceptionObject = request;
    }    
}