using core.Exceptions.Base;

namespace services.Exceptions.Orders;

public class OrderNotFoundException : NotFoundException
{
    public OrderNotFoundException(Guid orderId) : base("Order not found")
    {
        ExceptionObject = orderId;
    }
}