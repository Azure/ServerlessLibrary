using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ServerlessLibrary.Models;
using System;

namespace ServerlessLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricsController : ControllerBase
    {
        private ILogger<MetricsController> logger;
        public MetricsController(ILogger<MetricsController> logger)
        {
            this.logger = logger;
        }
        // PUT api/<controller>
        [ProducesResponseType(typeof(bool), 200)]
        [HttpPut]
        public JsonResult Put([FromBody]string id)
        {
            try
            {
                StorageHelper.updateUserStats(JsonConvert.SerializeObject(new { id, userAction = "download" })).Wait();
            }
            catch (Exception ex)
            {
                logger.LogError("Unable to update download count. Exception: {0}", ex.ToString());
            }

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

            try
            {
                StorageHelper.updateUserStats(JsonConvert.SerializeObject(new
                {
                    id = sentimentPayload.Id,
                    userAction = "Sentiment",
                    likeChanges = sentimentPayload.LikeChanges,
                    dislikeChanges = sentimentPayload.DislikeChanges
                })).Wait();
            }
            catch (Exception ex)
            {
                logger.LogError("Unable to update Sentiments. Exception: {0}", ex.ToString());
            }

            return new JsonResult(true);
        }
    }
}