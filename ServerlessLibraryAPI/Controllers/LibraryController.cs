using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using ServerlessLibrary.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerlessLibrary.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class LibraryController : Controller
    {
        ICacheService _cacheService;
        ILibraryStore _libraryStore;

        public LibraryController(ICacheService cacheService, ILibraryStore libraryStore)
        {
            this._cacheService = cacheService;
            this._libraryStore = libraryStore;
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
                        || (x.Tags != null && x.Tags.Any(t => Regex.IsMatch(t,filterText, RegexOptions.IgnoreCase)))
                    )
                )
            );

            return new JsonResult(filteredResults);
        }

        [HttpPut]
        [ProducesResponseType(typeof(LibraryItem), 200)]
        public IActionResult Put([FromBody]LibraryItem libraryItem)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            libraryItem.Id = Guid.NewGuid().ToString();

            GitHubUser user = new GitHubUser(User);
            libraryItem.Author = user.UserName;
            // this._libraryStore.Add(libraryItem);
            return new JsonResult(libraryItem);
        }
    }


}
