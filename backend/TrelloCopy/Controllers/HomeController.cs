using Microsoft.AspNetCore.Mvc;

namespace TrelloCopy.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Index()
    {
        return Ok(new { message = "TrelloCopy API is running" });
    }
}
