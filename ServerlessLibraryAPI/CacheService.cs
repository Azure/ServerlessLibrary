using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ServerlessLibrary
{
    public interface ICacheService {
        IList<LibraryItem> GetCachedItems();
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
            _cache.Set<LibraryItemsResult>(ServerlessLibrarySettings.CACHE_ENTRY, new LibraryItemsResult() { Result = new List<LibraryItem>(), IsBusy = true });

            Timer = new Timer(TimerTickAsync, null, 1000, ServerlessLibrarySettings.SLCacheRefreshIntervalInSeconds * 1000);
        }

        public Task LoadingTask = Task.CompletedTask;
        public Timer Timer { get; set; }
        public bool LoadingBusy = false;

        public IList<LibraryItem> GetCachedItems() {
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
        private async Task<IList<LibraryItem>> ConstructCache()
        {
            IList<LibraryItem> libraryItems;

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
                            int itemsCountInStore = this.libraryStore.Count();

                            // Assign an Id which is a string form of integer to each item. Otherwise cosmosdb will assign a guid as id which is not user friendly.  
                            libraryItem.Id = (itemsCountInStore + 1) + string.Empty;
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
            foreach (var item in libraryItems)
            {
                var itemStat = item.Template != null ? stats.Where(s => s.template == item.Template.ToString()).FirstOrDefault() : null;
                item.TotalDownloads = itemStat != null ? itemStat.totalDownloads : 1;
                item.DownloadsThisMonth = itemStat != null ? itemStat.downloadsThisMonth : 1;
                item.DownloadsThisWeek = itemStat != null ? itemStat.downloadsThisWeek : 1;
                item.DownloadsToday = itemStat != null ? itemStat.downloadsToday : 1;
                item.AuthorTypeDesc = (item.AuthorType == "Microsoft" ? "This has been authored by Microsoft" : "This is a community contribution");
            }

            return libraryItems;
        }
    }
    public class LibraryItemsResult {
        public IList<LibraryItem> Result { get; set; }
        public bool IsBusy{ get; set; }
    }

}
