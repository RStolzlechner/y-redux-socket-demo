using DemoServer.Enums;
using DemoServer.Models;
using DemoServer.Service;
using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Hub;

/// <summary>
/// Represents a hub for managing demo items notifications.
/// </summary>
/// <remarks>
/// This class inherits from <see cref="Hub{T}"/> and implements <see cref="IDemoItemHub"/>.
/// The hub allows clients to connect and perform operations related to demo items.
/// </remarks>
public class DemoItemHub(IDemoItemService demoItemService, IActionStore actionStore) : Hub<IDemoItemHub>
{
    /// <summary>
    /// Adds the connection to the socket group for DemoItem and loads all the demo items.
    /// </summary>
    /// <returns>An enumerable collection of DemoItem objects.</returns>
    public async Task<LoadDemoItemsResponse> LoadDemoItems()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, SocketGroup.DemoItem.GetSocketGroupName());

        await actionStore.WaitAsync();
        try
        {
            var items = await demoItemService.GetAllAsync();
            var version = actionStore.VersionNumber;

            return new LoadDemoItemsResponse( items, version);
        }
        finally
        {
            actionStore.ReleaseAsync();
        }
    }
}