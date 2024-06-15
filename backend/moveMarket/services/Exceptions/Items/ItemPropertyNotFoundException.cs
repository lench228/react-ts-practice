using core.Exceptions.Base;

namespace services.Exceptions.Items;

public class ItemPropertyNotFoundException : NotFoundException
{
    public ItemPropertyNotFoundException() : base("ItemProperty not found")
    {
    }
}