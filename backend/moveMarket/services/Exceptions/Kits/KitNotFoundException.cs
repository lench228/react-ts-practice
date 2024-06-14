using core.Exceptions.Base;

namespace services.Exceptions.Kits;

public class KitNotFoundException : NotFoundException
{
    public KitNotFoundException(Guid kitId) : base("Kit with this id is not found")
    {
        ExceptionObject = kitId;
    }
}