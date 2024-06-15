using core.Exceptions.Base;

namespace services.Exceptions.Cart;

public class CartKitNotFoundException : NotFoundException
{
    public CartKitNotFoundException(Guid cartKitId) : base("CartKit with this id is not found")
    {
        ExceptionObject = cartKitId;
    }
}