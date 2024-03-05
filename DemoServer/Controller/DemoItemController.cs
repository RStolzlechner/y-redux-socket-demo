using DemoServer.Enums;
using DemoServer.Hub;
using DemoServer.Models;
using DemoServer.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Controller;

/// <summary>
/// Controller class for managing demo items through API endpoints.
/// </summary>
[AllowAnonymous]
[ApiController]
[Route("api/demo-item")]
public class DemoItemController(
    IDemoItemService demoItemService, 
    IHubContext<DemoItemHub, IDemoItemHub> hubContext): ControllerBase
{
    /// <summary>
    /// Creates a new DemoItem.
    /// </summary>
    /// <param name="demoItem">The DemoItem object representing the new item to be created.</param>
    /// <returns>An IActionResult representing the result of the operation.</returns>
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

    /// <summary>
    /// Updates a DemoItem object.
    /// </summary>
    /// <param name="demoItem">The DemoItem object to be updated.</param>
    /// <returns>An IActionResult representing the result of the update operation.</returns>
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

    /// <summary>
    /// Deletes a demo item by its ID.
    /// </summary>
    /// <param name="id">The ID of the demo item to delete.</param>
    /// <returns>An IActionResult representing the result of the delete operation.</returns>
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