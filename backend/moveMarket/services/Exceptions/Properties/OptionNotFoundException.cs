using core.Exceptions.Base;

namespace services.Exceptions.Properties;

public class OptionNotFoundException : NotFoundException
{
    public OptionNotFoundException(Guid id) : base("Option with this id is not found")
    {
        ExceptionObject = id;
    }
}