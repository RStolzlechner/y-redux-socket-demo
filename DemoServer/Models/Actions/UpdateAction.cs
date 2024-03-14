namespace DemoServer.Models.Actions;

/// <summary>
/// commands the update of a demo item to the server
/// </summary>
public record UpdateAction(long Id, string Name, string Description) : BaseAction(ActionTypes.Update, Id);

/// <summary>
/// informs the clients that a demo item has been successfully updated
/// </summary>
public record UpdateSuccessAction(long Id, string Name, string Description) : BaseAction(ActionTypes.UpdateSuccess, Id)
{
    public UpdateSuccessAction(DemoItem item) : this(item.Id, item.Name, item.Description ?? string.Empty){ }
};