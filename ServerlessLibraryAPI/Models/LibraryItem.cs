﻿using System;
using Newtonsoft.Json;

namespace ServerlessLibrary.Models
{
    public class LibraryItemWithStats : LibraryItem
    {
        [JsonProperty(PropertyName = "totaldownloads", DefaultValueHandling = DefaultValueHandling.Include)]
        public int TotalDownloads { get;  set; }

        [JsonProperty(PropertyName = "likes", DefaultValueHandling = DefaultValueHandling.Include)]
        public int Likes { get; set; }

        [JsonProperty(PropertyName = "dislikes", DefaultValueHandling = DefaultValueHandling.Include)]
        public int Dislikes { get; set; }
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

        [JsonProperty(PropertyName = "technologies", DefaultValueHandling = DefaultValueHandling.Include)]
        public string[] Technologies { get; set; }

        [JsonProperty(PropertyName = "solutionareas", DefaultValueHandling = DefaultValueHandling.Include)]
        public string[] SolutionAreas { get; set; }

        [JsonProperty(PropertyName = "author", DefaultValueHandling = DefaultValueHandling.Include)]
        public string Author { get; internal set; }    

        internal T ConvertTo<T>()
        {
            var serializedObj = JsonConvert.SerializeObject(this);
            return JsonConvert.DeserializeObject<T>(serializedObj);
        }
    }
}
