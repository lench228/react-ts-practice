using core.Exceptions.Base;

namespace services.Exceptions.User;

public class UpdateUserBadRequestException : BadRequestException
{
    public UpdateUserBadRequestException(string message, object exceptionObject) : base(message)
    {
        ExceptionObject = exceptionObject;
    }
}