using DemoServer.Enums;
using DemoServer.Infrastructure;
using DemoServer.Models;
using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Hub;

public class DemoItemHub(IDemoItemRepository demoItemRepository) : Hub<IDemoItemHub>
{
    /// <summary>
    /// Adds the connection to the socket group for DemoItem and loads all the demo items.
    /// </summary>
    /// <returns>An enumerable collection of DemoItem objects.</returns>
    public async Task<IEnumerable<DemoItem>> LoadDemoItems()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"socket-group-{SocketGroup.DemoItem}");
        var items = await demoItemRepository.GetAllAsync();
        
        return items;
    }
}