using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.Threading;
using System.Net;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerLessLibrary
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class LibraryController : Controller
    {
        ICacheService _cacheService;
        public LibraryController(ICacheService cacheService)
        {
            this._cacheService = cacheService;
        }
        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<LibraryItem>), 200)]
        public JsonResult Get()
        {
            
            var results = _cacheService.GetCachedItems();
            return new JsonResult(results);
        }

        // PUT api/<controller>/
        [ProducesResponseType(typeof(bool), 200)]
        [HttpPut()]
        public JsonResult Put([FromForm]string template)
        {
            
            StorageHelper.updateDownloadCount(JsonConvert.SerializeObject( new { template = WebUtility.UrlDecode(template) }));
            return new JsonResult(true);
        }

    }


}
