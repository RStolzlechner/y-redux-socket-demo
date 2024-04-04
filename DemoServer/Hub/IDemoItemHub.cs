using DemoServer.Models;
using DemoServer.Models.Actions;

namespace DemoServer.Hub;

/// <summary>
/// Defines the method that the server can call on the client.
/// </summary>
public interface IDemoItemHub
{
    /// <summary>
    /// used to notify the clients that a new action(s) is(are) available
    /// </summary>
    /// <returns></returns>
    Task OnNewAction();
}