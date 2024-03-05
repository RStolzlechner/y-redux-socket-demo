using DemoServer.Models;

namespace DemoServer.Hub;

/// <summary>
/// Defines the method that the server can call on the client.
/// </summary>
public interface IDemoItemHub
{
    /// <summary>
    /// Notifies the client that a new demo item has been created.
    /// </summary>
    /// <param name="demoItem">The demo item which was created</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    Task DemoItemCreated(DemoItem demoItem);

    /// <summary>
    /// Notifies the client that a demo item has been updated.
    /// </summary>
    /// <param name="demoItem">The demo item that has been updated</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task DemoItemUpdated(DemoItem demoItem);

    /// <summary>
    /// Notifies the client that a demo item has been deleted.
    /// </summary>
    /// <param name="id">The ID of the deleted demo item</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task DemoItemDeleted(long id);
}