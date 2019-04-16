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
        public JsonResult Put([FromBody]string id, string userAction)
        {
            StorageHelper.updateUserStats(JsonConvert.SerializeObject(new { id = WebUtility.UrlDecode(id), userAction }));
            return new JsonResult(true);
        }
    }
}