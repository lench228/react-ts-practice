namespace core.Exceptions.Base;

public abstract class BaseResponseException(string message) : Exception(message)
{
    public object? ExceptionObject { get; set; }
}