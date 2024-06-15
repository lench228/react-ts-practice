using core.Exceptions.Base;

namespace services.Exceptions.Cart;

public class CartKitActionForbiddenException : ForbiddenException
{
    public CartKitActionForbiddenException(Guid cartKitId) 
        : base("The current user is not allowed to perform this action to this CartKit")
    {
        ExceptionObject = cartKitId;
    }
}