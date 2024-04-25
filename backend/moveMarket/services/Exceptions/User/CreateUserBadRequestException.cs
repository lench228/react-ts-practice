using core.Dto.Auth;
using core.Exceptions.Base;

namespace services.Exceptions.User;

public class CreateUserBadRequestException : BadRequestException
{
    public CreateUserBadRequestException(string message, CreateUserRequest request) : base(message)
    {
        ExceptionObject = request;
    }
}