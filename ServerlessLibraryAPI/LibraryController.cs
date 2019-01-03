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
using System.Text.RegularExpressions;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerlessLibrary
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
        public JsonResult Get(string filterText, string type, string language)
        {
            
            var results = _cacheService.GetCachedItems();
            var filteredResults = results.Where(
                x =>
                (
                    (string.IsNullOrWhiteSpace(language) || x.Language == language) &&
                    (string.IsNullOrWhiteSpace(type) || x.Type == type) &&
                    (
                        string.IsNullOrWhiteSpace(filterText)
                        || Regex.IsMatch(x.Title, filterText, RegexOptions.IgnoreCase)
                        || Regex.IsMatch(x.Description, filterText, RegexOptions.IgnoreCase)
                        || Regex.IsMatch(x.AuthorType, filterText, RegexOptions.IgnoreCase)
                        || Regex.IsMatch(x.Repository.AbsoluteUri.Replace("https://github.com/", "", StringComparison.InvariantCulture), filterText, RegexOptions.IgnoreCase)
                        || (x.RuntimeVersion != null && Regex.IsMatch(x.RuntimeVersion, filterText, RegexOptions.IgnoreCase))
                    )
                )
            );

            return new JsonResult(filteredResults);
        }

        // PUT api/<controller>/
        [ProducesResponseType(typeof(bool), 200)]
        [HttpPut()]
        public JsonResult Put([FromBody]string template)
        {
            
            StorageHelper.updateDownloadCount(JsonConvert.SerializeObject( new { template = WebUtility.UrlDecode(template) }));
            return new JsonResult(true);
        }

    }


}
