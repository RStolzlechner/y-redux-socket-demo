using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DemoServer.Controller;

[AllowAnonymous]
[ApiController]
[Route("api/y-redux-socket")]
public class YReduxSocketController
{
}