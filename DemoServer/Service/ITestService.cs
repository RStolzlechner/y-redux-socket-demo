namespace DemoServer.Service;

public interface ITestService
{
    Task<string> Ping();
}