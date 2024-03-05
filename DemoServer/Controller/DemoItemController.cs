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
    
    [HttpPut]
    public async Task<IActionResult> UpdateDemoItem([FromBody] DemoItem demoItem)
    {
        if(demoItem.Id == 0)
            return BadRequest("Id is required");
        var existingItem = await demoItemService.GetByIdAsync(demoItem.Id);
        if(existingItem == null)
            return NotFound();
        
        await demoItemService.UpdateAsync(demoItem);

        await hubContext.Clients.Groups(SocketGroup.DemoItem.GetSocketGroupName()).DemoItemUpdated(demoItem);
        
        return Ok();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDemoItem(long id)
    {
        var existingItem = await demoItemService.GetByIdAsync(id);
        if(existingItem == null)
            return NotFound();
        
        await demoItemService.DeleteAsync(id);

        await hubContext.Clients.Groups(SocketGroup.DemoItem.GetSocketGroupName()).DemoItemDeleted(id);
        
        return Ok();
    }
}