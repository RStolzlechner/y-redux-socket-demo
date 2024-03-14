using DemoServer.Models;
using DemoServer.Models.Actions;

namespace DemoServer.Hub;

/// <summary>
/// Defines the method that the server can call on the client.
/// </summary>
public interface IDemoItemHub
{
    /// <summary>
    /// Used to Notify the clients that an action has been successfully executed
    /// </summary>
    /// <param name="action">the success action</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    Task DispatchSuccess(BaseAction action);
}