using System;
using Newtonsoft.Json;

namespace ServerlessLibrary.Models
{
    public class LibraryItem
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "title", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "template", DefaultValueHandling = DefaultValueHandling.Include)]
        public Uri Template { get; set; }

        [JsonProperty(PropertyName = "repository", DefaultValueHandling = DefaultValueHandling.Include)]
        public Uri Repository { get; set; }

        [JsonProperty(PropertyName = "description", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "tags", DefaultValueHandling = DefaultValueHandling.Include)]
        public string[] Tags { get; set; }

        [JsonProperty(PropertyName = "language", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Language { get; set; }

        [JsonProperty(PropertyName = "type", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "author", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Author { get; internal set; }

        [JsonProperty(PropertyName = "authortype", DefaultValueHandling = DefaultValueHandling.Include)]
        public string AuthorType { get; set; }

        [JsonProperty(PropertyName = "authortypedesc", DefaultValueHandling = DefaultValueHandling.Include)]
        public string AuthorTypeDesc { get; set; }

        [JsonProperty(PropertyName = "totaldownloads", DefaultValueHandling = DefaultValueHandling.Include)]
        public int TotalDownloads { get;  set; }

        [JsonProperty(PropertyName = "downloadsthismonth", DefaultValueHandling = DefaultValueHandling.Include)]
        public int DownloadsThisMonth { get; set; }

        [JsonProperty(PropertyName = "downloadsthisweek", DefaultValueHandling = DefaultValueHandling.Include)]
        public int DownloadsThisWeek { get; set; }

        [JsonProperty(PropertyName = "downloadstoday", DefaultValueHandling = DefaultValueHandling.Include)]
        public int DownloadsToday { get; set; }
        
        [JsonProperty(PropertyName = "runtimeversion", DefaultValueHandling = DefaultValueHandling.Include)]
        public string RuntimeVersion { get; set; }

        public LibraryItem(string title, string template, string repository, string description, string language,
            string type)
        {
            this.Title = title;
            this.Template = string.IsNullOrWhiteSpace(template)? null : new Uri(template);
            this.Repository = new Uri(repository);
            this.Description = description;
            this.Language = language;
            this.Type = type;
        }
    }
}
