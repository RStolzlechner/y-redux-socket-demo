namespace DemoServer.Service;

public interface IDemoItemService
{
    Task<string> Ping();
}