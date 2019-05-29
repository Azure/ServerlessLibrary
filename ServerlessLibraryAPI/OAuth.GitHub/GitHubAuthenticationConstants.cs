namespace ServerlessLibrary.OAuth.GitHub
{
    /// <summary>
    /// Contains constants specific to the <see cref="GitHubAuthenticationHandler"/>.
    /// </summary>
    public static class GitHubAuthenticationConstants
    {
        public static class Claims
        {
            public const string Name = "urn:github:name";
            public const string Url = "urn:github:url";
            public const string Login = "urn:github:login";
            public const string Avatar = "urn:github:avatar";
        }
    }
}
