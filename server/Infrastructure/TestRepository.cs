namespace Infrastructure;

public class TestRepository : ITestRepository
{
    public string Ping()
    {
        return "Pong from Infra!";
    }
}