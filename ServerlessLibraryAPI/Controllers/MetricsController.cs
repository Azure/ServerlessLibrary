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
        // PUT api/<controller>/
        [ProducesResponseType(typeof(bool), 200)]
        [HttpPut()]
        public JsonResult Put([FromBody]string template)
        {

            StorageHelper.updateDownloadCount(JsonConvert.SerializeObject(new { template = WebUtility.UrlDecode(template) }));
            return new JsonResult(true);
        }
    }
}