namespace Service;

public class TestService : ITestService
{
    public string Ping()
    {
        return "Pong from Service!";
    }
}