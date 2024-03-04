using DemoServer.Models;

namespace DemoServer.Enums;

public enum SocketGroup
{
    DemoItem = 1
    
    //add methods to get the string value of the enum
}

public static class SocketGroupExtensions
{
    public static string GetSocketGroupName(this SocketGroup socketGroup)
    {
        return $"socket-group-{socketGroup}";
    }
}