using core.Exceptions.Base;

namespace services.Exceptions.Properties;

public class PropertyNotFoundException : NotFoundException
{
    public PropertyNotFoundException(Guid id) : base("Property with this id is not found")
    {
        ExceptionObject = id;
    }
}