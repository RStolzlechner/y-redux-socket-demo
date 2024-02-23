using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Service;

namespace server.Controller;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class TestController(ITestService testService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Ping()
    {
        var message = await testService.Ping();

        return Ok(new {message});
    }
}