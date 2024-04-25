using core.Dto.User;
using core.Exceptions.Base;

namespace services.Exceptions.User;

public class ChangeUserPasswordBadRequestException : BadRequestException
{
    public ChangeUserPasswordBadRequestException(string message, ChangePasswordRequest exceptionObject) 
        : base(message)
    {
        ExceptionObject = exceptionObject;
    }
}