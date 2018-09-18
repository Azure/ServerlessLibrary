using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ServerLessLibrary
{
    public interface ICacheService {
        List<LibraryItem> GetCachedItems();
    }
    //https://stackoverflow.com/questions/44723017/in-memory-caching-with-auto-regeneration-on-asp-net-core
    public class CacheService:ICacheService
    {
        protected readonly IMemoryCache _cache;
        private IHostingEnvironment _env;

        public CacheService(IMemoryCache cache, IHostingEnvironment env)
        {
            this._cache = cache;
            this._env = env;
            InitTimer();
        }
        private void InitTimer()
        {
            _cache.Set<LibraryItemsResult>(ServerLessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = new List<LibraryItem>(), IsBusy = true });

            Timer = new Timer(TimerTickAsync, null, 1000, ServerLessLibrarySettings.SLCacheRefreshIntervalInSeconds * 1000);
        }

        public Task LoadingTask = Task.CompletedTask;
        public Timer Timer { get; set; }
        public bool LoadingBusy = false;

        public List<LibraryItem> GetCachedItems() {
            return _cache.Get<LibraryItemsResult>(ServerLessLibrarySettings.CACHE_ENTRY).Result;
        }
        private async void TimerTickAsync(object state)
        {
            if (LoadingBusy) return;
            try
            {
                LoadingBusy = true;
                LoadingTask = LoadCaches();
                await LoadingTask;
            }
            catch
            {
                // do not crash the app
            }
            finally
            {
                LoadingBusy = false;
            }
        }
        private async Task LoadCaches()
        {
            try
            {
                var items = await ConstructCache();
                _cache.Set<LibraryItemsResult>(ServerLessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = items, IsBusy = false });
            }
            catch { }
        }
        private async Task<List<LibraryItem>> ConstructCache()
        {
            var webRoot = _env.WebRootPath;
            var file = System.IO.Path.Combine(webRoot, "items.json");
            var stats = await StorageHelper.getSLItemRecordsAsync();
            var fileContent = JsonConvert.DeserializeObject<List<LibraryItem>>(await System.IO.File.ReadAllTextAsync(file));
            foreach (var item in fileContent)
            {
                var itemStat = stats.Where(s => s.template == item.Template.ToString()).FirstOrDefault();
                item.TotalDownloads = itemStat != null ? itemStat.totalDownloads : 1;
                item.DownloadsThisMonth = itemStat != null ? itemStat.downloadsThisMonth : 1;
                item.DownloadsThisWeek = itemStat != null ? itemStat.downloadsThisWeek : 1;
                item.DownloadsToday = itemStat != null ? itemStat.downloadsToday : 1;
                item.AuthorTypeDesc = (item.AuthorType == "Microsoft" ? "This has been authored by Microsoft" : "This is a community contribution");
            }
            return fileContent;
        }

    }
    public class LibraryItemsResult {
        public List<LibraryItem> Result { get; set; }
        public bool IsBusy{ get; set; }
    }

}
