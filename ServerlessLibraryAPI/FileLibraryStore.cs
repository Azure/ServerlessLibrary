using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using ServerlessLibrary.Models;

namespace ServerlessLibrary
{
    /// <summary>
    /// File library store. This storewill be useful for dev environement as well as untill cosmos db is onboarded 
    /// </summary>

    public class FileLibraryStore : ILibraryStore
    {
        private IHostingEnvironment _env;

        public FileLibraryStore(IHostingEnvironment env)
        {
            _env = env;
        }

        public Task Add(LibraryItem libraryItem)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<LibraryItem>> GetAllItems()
        {
            var webRoot = _env.WebRootPath;
            var file = System.IO.Path.Combine(webRoot, "items.json");
            var fileContent = JsonConvert.DeserializeObject<List<LibraryItem>>(await System.IO.File.ReadAllTextAsync(file));
            return fileContent;
        }
    }
}