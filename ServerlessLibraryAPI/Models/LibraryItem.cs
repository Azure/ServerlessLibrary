using System;
using Newtonsoft.Json;

namespace ServerlessLibrary.Models
{
    public class LibraryItemWithStats : LibraryItem
    {
        internal static LibraryItemWithStats Load(LibraryItem libraryItem)
        {
            var serializedObj = JsonConvert.SerializeObject(libraryItem);
            return JsonConvert.DeserializeObject<LibraryItemWithStats>(serializedObj);
        }

        [JsonProperty(PropertyName = "totaldownloads", DefaultValueHandling = DefaultValueHandling.Include)]
        public int TotalDownloads { get;  set; }

        [JsonProperty(PropertyName = "downloadsthismonth", DefaultValueHandling = DefaultValueHandling.Include)]
        public int DownloadsThisMonth { get; set; }

        [JsonProperty(PropertyName = "downloadsthisweek", DefaultValueHandling = DefaultValueHandling.Include)]
        public int DownloadsThisWeek { get; set; }

        [JsonProperty(PropertyName = "downloadstoday", DefaultValueHandling = DefaultValueHandling.Include)]
        public int DownloadsToday { get; set; }
    }

    public class LibraryItem
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "createddate")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty(PropertyName = "title", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "template", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Template { get; set; }

        [JsonProperty(PropertyName = "repository", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Repository { get; set; }

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

        [JsonProperty(PropertyName = "runtimeversion", DefaultValueHandling = DefaultValueHandling.Include)]
        public string RuntimeVersion { get; set; }

        internal T ConvertTo<T>()
        {
            var serializedObj = JsonConvert.SerializeObject(this);
            return JsonConvert.DeserializeObject<T>(serializedObj);
        }
    }
}
