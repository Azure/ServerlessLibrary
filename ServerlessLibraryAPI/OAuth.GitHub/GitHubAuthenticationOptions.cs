using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http;
using static ServerlessLibrary.OAuth.GitHub.GitHubAuthenticationConstants;

namespace ServerlessLibrary.OAuth.GitHub
{
    /// <summary>
    /// Defines a set of options used by <see cref="GitHubAuthenticationHandler"/>.
    /// </summary>
    public class GitHubAuthenticationOptions : OAuthOptions
    {
        public GitHubAuthenticationOptions()
        {
            ClaimsIssuer = GitHubAuthenticationDefaults.Issuer;

            CallbackPath = new PathString(GitHubAuthenticationDefaults.CallbackPath);

            AuthorizationEndpoint = GitHubAuthenticationDefaults.AuthorizationEndpoint;
            TokenEndpoint = GitHubAuthenticationDefaults.TokenEndpoint;
            UserInformationEndpoint = GitHubAuthenticationDefaults.UserInformationEndpoint;
            //Scope.Add(GitHubAuthenticationDefaults.UserInformationScope);
            Scope.Add(GitHubAuthenticationDefaults.UserEmailsScope);

            ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
            ClaimActions.MapJsonKey(ClaimTypes.Name, "login");
            ClaimActions.MapJsonKey(ClaimTypes.Email, "email");
            ClaimActions.MapJsonKey(Claims.Name, "name");
            ClaimActions.MapJsonKey(Claims.Url, "html_url");
            ClaimActions.MapJsonKey(Claims.Login, "login");
            ClaimActions.MapJsonKey(Claims.Avatar, "avatar_url");
        }

        /// <summary>
        /// Gets or sets the address of the endpoint exposing
        /// the email addresses associated with the logged in user.
        /// </summary>
        public string UserEmailsEndpoint { get; set; } = GitHubAuthenticationDefaults.UserEmailsEndpoint;
    }
}
