using DemoServer.Models;
using DemoServer.Service;
using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Hub;

public class YReduxSocketHub(IDemoItemService demoItemService) : Hub<IYReduxSocketHub>
{
    private const string DemoItemsGroup = "DemoItems";
    
    public async Task<IEnumerable<DemoItem>> GetAllDemoItems()
    {
        var items = await demoItemService.GetAllAsync();
        
        var connectionId = Context.ConnectionId;
        await Groups.AddToGroupAsync(connectionId, DemoItemsGroup);
        
        return items;
    }
}