namespace server.Infrastructure;

public interface ITestRepository
{
    Task<string> Ping();
}