namespace DemoServer.Models;

/// <summary>
/// Represents a demo item with its unique identifier, name, and description.
/// </summary>
public record DemoItem(long Id, string Name, string? Description);