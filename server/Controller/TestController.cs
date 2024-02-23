using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace Controller;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class TestController(ITestService testService) : ControllerBase
{
    [HttpGet]
    public IActionResult Ping()
    {
        var message = testService.Ping();

        return Ok(new {message});
    }
}