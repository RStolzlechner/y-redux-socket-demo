using DemoServer.Enums;
using DemoServer.Models;
using DemoServer.Service;
using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Hub;

public class YReduxSocketHub(IDemoItemService demoItemService) : Hub<IYReduxSocketHub>
{
    private const string SocketGroupString = "socket-group";
    
    private static string GetGroupName(SocketGroup group) => $"{SocketGroupString}-{group.ToString()}";
    
    public async Task<IEnumerable<DemoItem>> RegisterOnDemoItems()
    {
        var items = await demoItemService.GetAllAsync();
        
        var connectionId = Context.ConnectionId;
        await Groups.AddToGroupAsync(connectionId, GetGroupName(SocketGroup.DemoItem));
        
        return items;
    }
}