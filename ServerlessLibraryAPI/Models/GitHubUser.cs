using System.Security.Claims;
using static ServerlessLibrary.OAuth.GitHub.GitHubAuthenticationConstants;

namespace ServerlessLibrary.Models
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

        public string DisplayName
        {
            get
            {
                if (!string.IsNullOrWhiteSpace(this.FullName))
                {
                    return this.FullName.Split(' ')?[0];
                }

                if (!string.IsNullOrWhiteSpace(this.UserName))
                {
                    return this.UserName;
                }

                return string.Empty;
            }
        }
    }
}
