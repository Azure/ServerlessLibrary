using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using ServerlessLibrary.Models;
using Newtonsoft.Json;
using System.Threading.Tasks;


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
        [ProducesResponseType(typeof(IEnumerable<LibraryItemWithStats>), 200)]
        public JsonResult Get(string filterText, string language)
        {    
            //TODO: Add filtering for solution areas and technologies.
            var results = _cacheService.GetCachedItems();
            var filteredResults = results.Where(
                x =>
                (
                    (string.IsNullOrWhiteSpace(language) || x.Language == language) &&
                    (
                        string.IsNullOrWhiteSpace(filterText)
                        || Regex.IsMatch(x.Title, filterText, RegexOptions.IgnoreCase)
                        || Regex.IsMatch(x.Description, filterText, RegexOptions.IgnoreCase)
                        || Regex.IsMatch(x.Repository.Replace("https://github.com/", "", StringComparison.InvariantCulture), filterText, RegexOptions.IgnoreCase)
                        || (!string.IsNullOrWhiteSpace(x.Author) && Regex.IsMatch(x.Author, filterText, RegexOptions.IgnoreCase))
                        || (x.Tags != null && x.Tags.Any(t => Regex.IsMatch(t, filterText, RegexOptions.IgnoreCase)))
                        || (x.Technologies != null && x.Technologies.Any(t => Regex.IsMatch(t, filterText, RegexOptions.IgnoreCase)))
                        || (x.SolutionAreas != null && x.SolutionAreas.Any(c => Regex.IsMatch(c, filterText, RegexOptions.IgnoreCase)))
                      )
                )
            );

            return new JsonResult(filteredResults);
        }

        [HttpPut]
        [ProducesResponseType(typeof(LibraryItem), 200)]
        public async Task<IActionResult> Put([FromBody]LibraryItem libraryItem)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var validationsErrors = ValidateLibraryItem(libraryItem);
            if (validationsErrors?.Count > 0)
            {
                return BadRequest(validationsErrors);
            }

            // assign id, created date
            libraryItem.Id = Guid.NewGuid().ToString();
            libraryItem.CreatedDate = DateTime.UtcNow;

            // set the author to current authenticated user
            GitHubUser user = new GitHubUser(User);
            libraryItem.Author = user.UserName;
            await StorageHelper.submitContributionForApproval(JsonConvert.SerializeObject(libraryItem));
            return new JsonResult(libraryItem);
        }

        private static List<string> ValidateLibraryItem(LibraryItem libraryItem)
        {
            List<string> errors = new List<string>();
            if (string.IsNullOrWhiteSpace(libraryItem.Title))
            {
                errors.Add("Title cannot be empty");
            }

            if (string.IsNullOrWhiteSpace(libraryItem.Repository) || !IsValidUri(libraryItem.Repository))
            {
                errors.Add("Repository URL must be a valid GitHub URL");
            }

            if (string.IsNullOrWhiteSpace(libraryItem.Description))
            {
                errors.Add("Description cannot be empty");
            }

            if (libraryItem.Technologies.Length == 0)
            {
                errors.Add("At least one technology must be specified");
            }

            if (string.IsNullOrWhiteSpace(libraryItem.Language))
            {
                errors.Add("Language must be specified");
            }

            if (libraryItem.SolutionAreas.Length == 0)
            {
                errors.Add("At least one solution area must be specified");
            }

            if (!string.IsNullOrWhiteSpace(libraryItem.Template) && !IsValidUri(libraryItem.Template))
            {
                errors.Add("ARM template URL must be a valid URL");
            }

            return errors;
        }

        private static bool IsValidUri(string uriString)
        {
            try
            {
                var uri = new Uri(uriString);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
