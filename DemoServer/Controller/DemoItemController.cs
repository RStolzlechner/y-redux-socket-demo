using DemoServer.Enums;
using DemoServer.Hub;
using DemoServer.Models;
using DemoServer.Models.Actions;
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
    /// client can call this method to command the server to execute an action
    /// </summary>
    /// <param name="action">the action to be executed</param>
    /// <returns>An IActionResult representing the result of the operation.</returns>
    [HttpPut("dispatch")]
    public Task<IActionResult> DispatchAction([FromBody] BaseAction action)
    {
        return action switch
        {
            CreateAction createAction => CreateDemoItem(createAction),
            UpdateAction updateAction => UpdateDemoItem(updateAction),
            RemoveAction removeAction => RemoveDemoItem(removeAction),
            _ => Task.FromResult<IActionResult>(BadRequest("Unknown action type"))
        };
    }
    
    /// <summary>
    /// Creates a new DemoItem.
    /// </summary>
    /// <param name="createAction">The action with the necessary information.</param>
    /// <returns>An IActionResult representing the result of the operation.</returns>
    private async Task<IActionResult> CreateDemoItem(CreateAction createAction)
    {
        var item = new DemoItem(0, createAction.Name, createAction.Description);        
        
        if(!item.ValidForCreation)
            return BadRequest("Invalid create action.");
        
        var id = await demoItemService.CreateAsync(item);

        var success = new CreateSuccessAction(item with { Id = id });
        await hubContext.Clients.Groups(SocketGroup.DemoItem.GetSocketGroupName()).DispatchSuccess(success);
        
        return Ok();
    }

    /// <summary>
    /// Updates a DemoItem object.
    /// </summary>
    /// <param name="updateAction">The action with the necessary information.</param>
    /// <returns>An IActionResult representing the result of the update operation.</returns>
    private async Task<IActionResult> UpdateDemoItem(UpdateAction updateAction)
    {
        var demoItem = new DemoItem(updateAction.Id, updateAction.Name, updateAction.Description);
        
        if(!demoItem.ValidForUpdate)
            return BadRequest("Invalid update action.");
        
        var existingItem = await demoItemService.GetByIdAsync(demoItem.Id);
        if(existingItem == null)
            return NotFound();
        
        await demoItemService.UpdateAsync(demoItem);

        var success = new UpdateSuccessAction(demoItem);
        await hubContext.Clients.Groups(SocketGroup.DemoItem.GetSocketGroupName()).DispatchSuccess(success);
        
        return Ok();
    }

    /// <summary>
    /// Deletes a demo item by its ID.
    /// </summary>
    /// <param name="removeAction">The action with the necessary information.</param>
    /// <returns>An IActionResult representing the result of the delete operation.</returns>
    private async Task<IActionResult> RemoveDemoItem(RemoveAction removeAction)
    {
        var id = removeAction.Id;
        var existingItem = await demoItemService.GetByIdAsync(id);
        if(existingItem == null)
            return NotFound();
        
        await demoItemService.DeleteAsync(id);

        var success = new RemoveSuccessAction(id);
        await hubContext.Clients.Groups(SocketGroup.DemoItem.GetSocketGroupName()).DispatchSuccess(success);
        
        return Ok();
    }
}