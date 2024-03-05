namespace DemoServer.Enums;

/// <summary>
/// Represents the available socket groups in the system.
/// </summary>
public enum SocketGroup
{
    DemoItem = 1
}

/// <summary>
/// Provides extension methods for the SocketGroup class.
/// </summary>
public static class SocketGroupExtensions
{
    /// <summary>
    /// Returns the name of the socket group.
    /// </summary>
    /// <param name="socketGroup">The SocketGroup object.</param>
    /// <returns>The name of the socket group.</returns>
    public static string GetSocketGroupName(this SocketGroup socketGroup)
    {
        return $"socket-group-{socketGroup}";
    }
}