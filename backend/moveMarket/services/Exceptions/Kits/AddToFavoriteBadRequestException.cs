using core.Exceptions.Base;
using Microsoft.AspNetCore.Identity;

namespace services.Exceptions.Kits;

public class AddToFavoriteBadRequestException : BadRequestException
{
    public AddToFavoriteBadRequestException(string message) : base("can't add the kit to the users' favorites")
    {
        ExceptionObject = message;
    }
}