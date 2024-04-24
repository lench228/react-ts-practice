namespace core.Exceptions.Base;

public abstract class NotFoundException(string message) : BaseResponseException(message);