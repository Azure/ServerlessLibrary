using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using ServerlessLibrary.Models;

namespace ServerlessLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("login"), HttpPost("login")]
        public IActionResult Login(string returnUrl = "/")
        {
            if (User.Identity.IsAuthenticated)
            {
                return new RedirectResult(returnUrl);
            }

            // Instruct the middleware corresponding to the requested external identity
            // provider to redirect the user agent to its own authorization endpoint.
            // Note: the authenticationScheme parameter must match the value configured in Startup.cs.
            // If no scheme is provided then the DefaultChallengeScheme will be used 
            return Challenge(new AuthenticationProperties { RedirectUri = returnUrl });
        }

        [HttpGet("logout"), HttpPost("logout")]
        public IActionResult Logout()
        {
            // Instruct the cookies middleware to delete the local cookie which 
            // was created after a successful authentication flow.
            return SignOut(
                new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet]
        [ProducesResponseType(typeof(GitHubUser), 200)]
        public IActionResult Get()
        {
            if (User.Identity.IsAuthenticated)
            {
                GitHubUser user = new GitHubUser(User);
                return Ok(user);
            }

            return Unauthorized();
        }
    }
}