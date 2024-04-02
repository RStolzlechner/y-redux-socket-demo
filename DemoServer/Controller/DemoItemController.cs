using System.Data;
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
    IHubContext<DemoItemHub, IDemoItemHub> hubContext,
    IActionStore actionStore): ControllerBase
{
    /// <summary>
    /// client can call this method to command the server to execute an action
    /// </summary>
    /// <param name="action">the action to be executed</param>
    /// <param name="version">the client version of the action</param>
    /// <returns>An IActionResult representing the result of the operation.</returns>
    [HttpPut("dispatch/{version:int}")]
    public async Task<IActionResult> DispatchAction([FromBody] BaseAction action, [FromRoute] int version)
    {
        await actionStore.WaitAsync();
        try
        {
            if (version != actionStore.VersionNumber)
                return Ok(new { Executed = false });

            BaseAction successAction = action switch
            {
                CreateAction createAction => await CreateDemoItem(createAction),
                UpdateAction updateAction => await UpdateDemoItem(updateAction),
                RemoveAction removeAction => await RemoveDemoItem(removeAction),
                DuplicateAction duplicateAction => await DuplicateDemoItem(duplicateAction),
                _ => throw new DataException("Unknown action type")
            };

            actionStore.Store(successAction);
            
            await hubContext.Clients.Groups(SocketGroup.DemoItem.GetSocketGroupName()).OnNewAction();
            return Ok(new { Executed = true });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        finally
        {
            actionStore.ReleaseAsync();
        }
    }

    /// <summary>
    /// get a list of actions that have been executed since the specified version
    /// </summary>
    [HttpGet("actions-since/{version:int}")]
    public IActionResult ActionsSince([FromRoute] int version)
    {
        var actions = actionStore.ActionsSince(version);
        return Ok(new { Actions = actions });
    }
    
    /// <summary>
    /// Creates a new DemoItem.
    /// </summary>
    /// <param name="createAction">The action with the necessary information.</param>
    /// <returns>An IActionResult representing the result of the operation.</returns>
    private async Task<CreateSuccessAction> CreateDemoItem(CreateAction createAction)
    {
        var item = new DemoItem(0, createAction.Name, createAction.Description);        
        
        if(!item.ValidForCreation)
            throw new DataException("Invalid create action.");
        
        var id = await demoItemService.CreateAsync(item);

        return new CreateSuccessAction(item with { Id = id });
    }
    
    /// <summary>
    /// Duplicate a  DemoItem.
    /// </summary>
    /// <param name="duplicateAction">The action with the necessary information.</param>
    /// <returns>An IActionResult representing the result of the operation.</returns>
    private async Task<CreateSuccessAction> DuplicateDemoItem(DuplicateAction duplicateAction)
    {
        var item = await demoItemService.DuplicateAsync(duplicateAction.Id);
        if (item is null) throw new DataException("Not found");

        return new CreateSuccessAction(item);
    }

    /// <summary>
    /// Updates a DemoItem object.
    /// </summary>
    /// <param name="updateAction">The action with the necessary information.</param>
    /// <returns>An IActionResult representing the result of the update operation.</returns>
    private async Task<UpdateSuccessAction> UpdateDemoItem(UpdateAction updateAction)
    {
        var demoItem = new DemoItem(updateAction.Id, updateAction.Name, updateAction.Description);
        
        if(!demoItem.ValidForUpdate)
            throw new DataException("Invalid update action.");
        
        var existingItem = await demoItemService.GetByIdAsync(demoItem.Id);
        if(existingItem == null)
            throw new DataException("Not Found.");
        
        await demoItemService.UpdateAsync(demoItem);

        return new UpdateSuccessAction(demoItem);
    }

    /// <summary>
    /// Deletes a demo item by its ID.
    /// </summary>
    /// <param name="removeAction">The action with the necessary information.</param>
    /// <returns>An IActionResult representing the result of the delete operation.</returns>
    private async Task<RemoveSuccessAction> RemoveDemoItem(RemoveAction removeAction)
    {
        var id = removeAction.Id;
        var existingItem = await demoItemService.GetByIdAsync(id);
        if(existingItem == null)
            throw new DataException("Not Found.");
        
        await demoItemService.DeleteAsync(id);

        return new RemoveSuccessAction(id);
    }
}