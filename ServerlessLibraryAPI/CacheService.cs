using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using ServerlessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ServerlessLibrary
{
    public interface ICacheService
    {
        IList<LibraryItemWithStats> GetCachedItems();
    }

    //https://stackoverflow.com/questions/44723017/in-memory-caching-with-auto-regeneration-on-asp-net-core
    public class CacheService : ICacheService
    {
        protected readonly IMemoryCache _cache;
        private readonly ILibraryStore libraryStore;
        private readonly ILogger logger;

        public CacheService(IMemoryCache cache, ILibraryStore libraryStore, ILogger<CacheService> logger)
        {
            this._cache = cache;
            this.libraryStore = libraryStore;
            this.logger = logger;
            InitTimer();
        }

        private void InitTimer()
        {
            _cache.Set<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = new List<LibraryItemWithStats>(), IsBusy = true });

            Timer = new Timer(TimerTickAsync, null, 1000, ServerlessLibrarySettings.SLCacheRefreshIntervalInSeconds * 1000);
        }

        public Task LoadingTask = Task.CompletedTask;
        public Timer Timer { get; set; }
        public bool LoadingBusy = false;
        private bool isCacheLoadedOnce = false;

        public IList<LibraryItemWithStats> GetCachedItems()
        {

            // Make a blocking call to load cache on first time call.
            if (!isCacheLoadedOnce)
            {
                try
                {
                    IList<LibraryItemWithStats> items = this.ConstructCache().Result;
                    _cache.Set(ServerlessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = items, IsBusy = false });
                }
                catch (Exception ex)
                {
                    this.logger.LogError(ex, "Failed to load cache in first call");
                }
            }

            isCacheLoadedOnce = true;
            return _cache.Get<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY).Result;
        }

        private async void TimerTickAsync(object state)
        {
            if (!isCacheLoadedOnce || LoadingBusy) return;
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
                _cache.Set<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = items, IsBusy = false });
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "Failed to load cache");
            }
        }
        private async Task<IList<LibraryItemWithStats>> ConstructCache()
        {
            IList<LibraryItem> libraryItems;
            IList<LibraryItemWithStats> libraryItemsWithStats = new List<LibraryItemWithStats>();
            libraryItems = await this.libraryStore.GetAllItems();
            var stats = await StorageHelper.getSLItemRecordsAsync();
            foreach (var storeItem in libraryItems)
            {
                var item = storeItem.ConvertTo<LibraryItemWithStats>();
                var itemStat = stats.Where(s => s.id == storeItem.Id.ToString()).FirstOrDefault();
                item.TotalDownloads = itemStat != null && itemStat.totalDownloads > 0 ? itemStat.totalDownloads : 1;
                item.Likes = itemStat != null && itemStat.likes > 0 ? itemStat.likes : 0;
                item.Dislikes = itemStat != null && itemStat.dislikes > 0 ? itemStat.dislikes : 0;
                libraryItemsWithStats.Add(item);
            }

            return libraryItemsWithStats;
        }
    }

    public class LibraryItemsResult
    {
        public IList<LibraryItemWithStats> Result { get; set; }
        public bool IsBusy { get; set; }
    }

}
