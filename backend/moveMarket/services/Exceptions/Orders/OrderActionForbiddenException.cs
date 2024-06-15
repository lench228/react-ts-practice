using core.Exceptions.Base;

namespace services.Exceptions.Orders;

public class OrderActionForbiddenException : ForbiddenException
{
    public OrderActionForbiddenException(Guid orderId) : 
        base("The current user is not allowed to perform this action to this order")
    {
        ExceptionObject = orderId;
    }
}