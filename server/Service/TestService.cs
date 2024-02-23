using Infrastructure;

namespace Service;

public class TestService(ITestRepository testRepository) : ITestService
{
    public string Ping()
    {
        var result = testRepository.Ping();
        return result;
    }
}