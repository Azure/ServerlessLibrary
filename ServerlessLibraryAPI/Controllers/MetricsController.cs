using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ServerlessLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricsController : ControllerBase
    {
        // PUT api/<controller>
        [ProducesResponseType(typeof(bool), 200)]
        [HttpPut]
        public JsonResult Put([FromBody]string id)
        {
            StorageHelper.updateUserStats(JsonConvert.SerializeObject(new { id, userAction = "download" }));
            return new JsonResult(true);
        }

        // PUT api/<controller>/sentiment
        [ProducesResponseType(typeof(bool), 200)]
        [HttpPut]
        [Route("sentiment/{likeChanges}/{dislikeChanges}")]
        public IActionResult Sentiment([FromBody]string id, int likeChanges, int dislikeChanges)
        {
            if (likeChanges < -1 || likeChanges > 1 || likeChanges == dislikeChanges)
            {
                return BadRequest("Invalid values for like or dislike count");
            }

            StorageHelper.updateUserStats(JsonConvert.SerializeObject(new { id, userAction = "Sentiment", likeChanges, dislikeChanges }));
            return new JsonResult(true);
        }
    }
}