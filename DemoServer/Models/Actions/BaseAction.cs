namespace DemoServer.Models.Actions;

/// <summary>
/// Base Type of the Actions
/// </summary>
/// <param name="Type">type string to identify the action</param>
/// <param name="Id">id of the referenced object</param>
public record BaseAction(string Type, long Id);