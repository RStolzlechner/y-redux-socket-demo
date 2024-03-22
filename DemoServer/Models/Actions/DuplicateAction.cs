namespace DemoServer.Models.Actions;

public record DuplicateAction(long Id) : BaseAction(ActionTypes.Duplicate, Id);
