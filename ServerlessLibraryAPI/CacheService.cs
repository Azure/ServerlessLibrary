using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using ServerlessLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ServerlessLibrary
{
    public interface ICacheService {
        IList<LibraryItemWithStats> GetCachedItems();
    }
    //https://stackoverflow.com/questions/44723017/in-memory-caching-with-auto-regeneration-on-asp-net-core
    public class CacheService:ICacheService
    {
        protected readonly IMemoryCache _cache;
        private IHostingEnvironment _env;
        private readonly ILibraryStore libraryStore;
        private static bool cosmosDBInitialized;

        public CacheService(IMemoryCache cache, IHostingEnvironment env, ILibraryStore libraryStore)
        {
            this._cache = cache;
            this._env = env;
            this.libraryStore = libraryStore;
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

        public IList<LibraryItemWithStats> GetCachedItems() {
            return _cache.Get<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY).Result;
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
                _cache.Set<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = items, IsBusy = false });
            }
            catch { }
        }
        private async Task<IList<LibraryItemWithStats>> ConstructCache()
        {
            IList<LibraryItem> libraryItems;
            IList<LibraryItemWithStats> libraryItemsWithStats = new List<LibraryItemWithStats>();

            if (cosmosDBInitialized)
            {
                libraryItems = await this.libraryStore.GetAllItems();
            }
            else
            {
                libraryItems = await new FileLibraryStore(_env).GetAllItems();

                if (!string.IsNullOrWhiteSpace(ServerlessLibrarySettings.CosmosEndpoint))
                {
                    IList<LibraryItem> libraryItemsInCosmos = await this.libraryStore.GetAllItems();
                    if (libraryItemsInCosmos.Count == 0)
                    {
                        foreach (LibraryItem libraryItem in libraryItems)
                        {
                            this.libraryStore.Add(libraryItem);
                        }
                    }
                    else
                    {
                        libraryItems = libraryItemsInCosmos;
                    }

                    cosmosDBInitialized = true;
                }
            }

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

    public class LibraryItemsResult {
        public IList<LibraryItemWithStats> Result { get; set; }
        public bool IsBusy{ get; set; }
    }

}
