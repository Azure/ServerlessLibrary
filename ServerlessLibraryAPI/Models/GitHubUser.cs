using System.Security.Claims;
using static ServerlessLibraryAPI.OAuth.GitHub.GitHubAuthenticationConstants;

namespace ServerlessLibraryAPI.Models
{
    public class GitHubUser
    {
        public GitHubUser()
        {
        }

        public GitHubUser(ClaimsPrincipal claimsPrincipal)
        {
            this.FullName = claimsPrincipal.FindFirstValue(Claims.Name);
            this.Email = claimsPrincipal.FindFirstValue(ClaimTypes.Email);
            this.AvatarUrl = claimsPrincipal.FindFirstValue(Claims.Avatar);
            this.UserName = claimsPrincipal.FindFirstValue(Claims.Login);
        }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string AvatarUrl { get; set; }

        public string UserName { get; set; }

        public string FirstName
        {
            get
            {
                return this.FullName.Split(' ')?[0];
            }
        }
    }
}
