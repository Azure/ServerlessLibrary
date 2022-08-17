using ServerlessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

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

        private Task LoadingTask = Task.CompletedTask;
        private Timer Timer = null;
        private bool LoadingBusy = false;
        private bool isCacheLoadedOnce = false;

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

        public IList<LibraryItemWithStats> GetCachedItems()
        {
            // Make a blocking call to load cache on first time call.
            if (!isCacheLoadedOnce)
            {
                try
                {
                    logger.LogInformation("Loading initial cache");
                    IList<LibraryItemWithStats> items = this.ConstructCache().Result;
                    _cache.Set(ServerlessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = items, IsBusy = false });
                    logger.LogInformation("Loaded {0} items into cache", items.Count());
                }
                catch (Exception ex)
                {
                    this.logger.LogError(ex, "Failed to load cache in first call");
                }
            }

            logger.LogInformation("Successfully loaded initial cache");
            isCacheLoadedOnce = true;
            return _cache.Get<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY).Result;
        }

        private async void TimerTickAsync(object state)
        {
            logger.LogInformation("Cache refresh timer fired");
            if (!isCacheLoadedOnce || LoadingBusy)
            {
                logger.LogWarning("Skipping cache refresh");
                return;
            }

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
                logger.LogInformation("Starting cache refresh");
                var items = await ConstructCache();
                _cache.Set<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = items, IsBusy = false });
                logger.LogInformation("Updated cache with {0} items", items.Count());
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, "Failed to load cache");
            }
        }
        private async Task<IList<LibraryItemWithStats>> ConstructCache()
        {
            logger.LogInformation("Starting ConstructCache");
            IList<LibraryItem> libraryItems;
            IList<LibraryItemWithStats> libraryItemsWithStats = new List<LibraryItemWithStats>();
            libraryItems = await this.libraryStore.GetAllItems();
            logger.LogInformation("Cosmos DB returned {0} results", libraryItems.Count());
            var stats = await StorageHelper.getSLItemRecordsAsync();
            logger.LogInformation("Storage returned {0} results", stats.Count());
            foreach (var storeItem in libraryItems)
            {
                var item = storeItem.ConvertTo<LibraryItemWithStats>();
                var itemStat = stats.Where(s => s.id == storeItem.Id.ToString()).FirstOrDefault();
                item.TotalDownloads = itemStat != null && itemStat.totalDownloads > 0 ? itemStat.totalDownloads : 1;
                item.Likes = itemStat != null && itemStat.likes > 0 ? itemStat.likes : 0;
                item.Dislikes = itemStat != null && itemStat.dislikes > 0 ? itemStat.dislikes : 0;
                libraryItemsWithStats.Add(item);
            }

            logger.LogInformation("ConstructCache returned {0} items", libraryItemsWithStats.Count());
            return libraryItemsWithStats;
        }
    }

    public class LibraryItemsResult
    {
        public IList<LibraryItemWithStats> Result { get; set; }
        public bool IsBusy { get; set; }
    }

}