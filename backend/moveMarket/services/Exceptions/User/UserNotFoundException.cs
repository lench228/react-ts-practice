using core.Dto.User;
using core.Exceptions.Base;
using domain.Entities;

namespace services.Exceptions.User;

public class UserNotFoundException : NotFoundException
{
    public UserNotFoundException(string email) 
        : base("User with this login is not found")
    {
        ExceptionObject = email;
    }

    public UserNotFoundException(Guid id) 
        : base("User with this id is not found")
    {
        ExceptionObject = id;
    }
}