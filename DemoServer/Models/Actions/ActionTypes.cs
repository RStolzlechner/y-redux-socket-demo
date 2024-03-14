namespace DemoServer.Models.Actions;

/// <summary>
/// Static class to define the action type strings (so they can be reused without typo issues) 
/// </summary>
public static class ActionTypes
{
    public const string Create = "[demo-item] create";
    public const string Update = "[demo-item] update";
    public const string Remove = "[demo-item] remove";
    
    
    public const string CreateSuccess = "[demo-item] create-success";
    public const string UpdateSuccess = "[demo-item] update-success";
    public const string RemoveSuccess = "[demo-item] remove-success";
}