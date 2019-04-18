using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ServerlessLibrary.Models;

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
        [Route("sentiment")]
        public IActionResult Sentiment([FromBody]SentimentPayload sentimentPayload)
        {
            if (sentimentPayload.LikeChanges < -1 
                || sentimentPayload.LikeChanges > 1 
                || sentimentPayload.LikeChanges == sentimentPayload.DislikeChanges)
            {
                return BadRequest("Invalid values for like or dislike count");
            }

            StorageHelper.updateUserStats(JsonConvert.SerializeObject(new
                                            {
                                                id = sentimentPayload.Id,
                                                userAction = "Sentiment",
                                                likeChanges = sentimentPayload.LikeChanges,
                                                dislikeChanges = sentimentPayload.DislikeChanges
                                            }));
            return new JsonResult(true);
        }
    }
}