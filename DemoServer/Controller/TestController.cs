using DemoServer.Hub;
using DemoServer.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DemoServer.Controller;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class TestController(IDemoItemService demoItemService, IHubContext<TestHub, ITestHub> hubContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Ping()
    {
        var item = await demoItemService.GetByIdAsync(1);

        return Ok(new { message = item?.Name ?? "No item" });
    }

    [HttpGet]
    [Route("signal-r-response")]
    public async Task<IActionResult> SignalRResponse()
    {
        await hubContext.Clients.All.TestCallClient("Hi from server via signal-r");
        
        return Ok();
    }
}