using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ServerlessLibrary;

namespace ServerlessLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricsController : ControllerBase
    {
        // PUT api/<controller>/{userAction}
        [ProducesResponseType(typeof(bool), 200)]
        [HttpPut]
        [Route("{userAction}")]
        public JsonResult Put([FromBody]string template, string userAction)
        {
            StorageHelper.updateUserStats(JsonConvert.SerializeObject(new { template = WebUtility.UrlDecode(template), userAction }));
            return new JsonResult(true);
        }
    }
}