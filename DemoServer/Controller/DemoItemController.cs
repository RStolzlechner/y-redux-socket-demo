using DemoServer.Enums;
using DemoServer.Hub;
using DemoServer.Models;
using DemoServer.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Controller;

[AllowAnonymous]
[ApiController]
[Route("api/demo-item")]
public class DemoItemController(
    IDemoItemService demoItemService, 
    IHubContext<DemoItemHub, IDemoItemHub> hubContext): ControllerBase
{
    
    
    [HttpPost]
    public async Task<IActionResult> CreateDemoItem([FromBody] DemoItem demoItem)
    {
        if(string.IsNullOrEmpty(demoItem.Name))
            return BadRequest("Name is required");
        
        var id = await demoItemService.CreateAsync(demoItem);
        var createdItem = demoItem with { Id = id };

        await hubContext.Clients.Groups(SocketGroup.DemoItem.GetSocketGroupName()).DemoItemCreated(createdItem);
        
        return Ok();
    }
}