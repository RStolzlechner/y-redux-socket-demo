namespace DemoServer.Infrastructure;

public interface ITestRepository
{
    Task<string> Ping();
}