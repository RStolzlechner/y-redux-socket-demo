using DemoServer.Infrastructure;
using DemoServer.Service;

namespace Service;

public class TestService(ITestRepository testRepository) : ITestService
{
    public Task<string> Ping()
    {
        var result = testRepository.Ping();
        return result;
    }
}