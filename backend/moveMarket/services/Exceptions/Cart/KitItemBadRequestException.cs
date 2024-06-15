using core.Exceptions.Base;

namespace services.Exceptions.Cart;

public class KitItemBadRequestException : BadRequestException
{
    public KitItemBadRequestException(object excObject) : base("no such item in this kit")
    {
        ExceptionObject = excObject;
    }
}