using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Hub;

public class TestHub : Hub<ITestHub>
{
    public string TestCallServer(string message)
    {
        return $"{message} returned from server.";
    }
}