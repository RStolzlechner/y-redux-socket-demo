namespace DemoServer.Models.Actions;

/// <summary>
/// Used from client to command server to create a demo item
/// </summary>
/// <param name="Name">name of the demo item</param>
/// <param name="Description">description of the demo item</param>
public record CreateAction(string Name, string Description) : BaseAction(ActionTypes.Create, 0);

/// <summary>
/// used from server to inform clients that a demo item has been created
/// </summary>
/// <param name="Id">id of the demo item</param>
/// <param name="Name">name of the demo item</param>
/// <param name="Description">description of the demo item</param>
public record CreateSuccessAction(long Id, string Name, string Description) : BaseAction(ActionTypes.CreateSuccess, Id)
{
    public CreateSuccessAction(DemoItem item) : this(item.Id, item.Name, item.Description ?? string.Empty){ }
};