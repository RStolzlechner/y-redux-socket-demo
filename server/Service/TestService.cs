using server.Infrastructure;
using server.Service;

namespace Service;

public class TestService(ITestRepository testRepository) : ITestService
{
    public Task<string> Ping()
    {
        var result = testRepository.Ping();
        return result;
    }
}