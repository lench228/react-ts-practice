using core.Dto.User;
using core.Exceptions.Base;

namespace services.Exceptions.User;

public class SetUserAddressBadRequestException : BadRequestException
{
    public SetUserAddressBadRequestException(string message, SetAddressRequest request) : base(message)
    {
        ExceptionObject = request;
    }
}