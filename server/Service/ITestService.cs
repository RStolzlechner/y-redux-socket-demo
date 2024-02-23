namespace server.Service;

public interface ITestService
{
    Task<string> Ping();
}