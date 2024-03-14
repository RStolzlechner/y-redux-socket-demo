namespace DemoServer.Models.Actions;

/// <summary>
/// commands the removal of a demo item to the server
/// </summary>
/// <param name="Id">id of the item which has to be removed</param>
public record RemoveAction(long Id) : BaseAction(ActionTypes.Remove, Id);

/// <summary>
/// informs the clients that a demo item has been successfully removed
/// </summary>
/// <param name="Id">the id of the removed item</param>
public record RemoveSuccessAction(long Id) : BaseAction(ActionTypes.RemoveSuccess, Id);