namespace DemoServer.Hub;

public interface ITestHub
{
    Task TestCallClient(string message);
}