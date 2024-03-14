namespace DemoServer.Models;

/// <summary>
/// Represents a demo item with its unique identifier, name, and description.
/// </summary>
public record DemoItem(long Id, string Name, string? Description)
{
    public bool ValidForCreation => HasValidName();
    public bool ValidForUpdate => HasValidName() && Id > 0;
    
    private bool HasValidName() => !string.IsNullOrEmpty(Name); 
};