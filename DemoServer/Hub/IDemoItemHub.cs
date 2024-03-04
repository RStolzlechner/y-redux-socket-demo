using DemoServer.Models;

namespace DemoServer.Hub;

public interface IDemoItemHub
{
    Task DemoItemCreated(DemoItem demoItem);
}