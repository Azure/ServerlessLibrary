using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using ServerlessLibrary.Models;

namespace ServerlessLibrary
{
    /// <summary>
    /// Cosmos db Library store
    /// </summary>
    public class CosmosLibraryStore : ILibraryStore
    {
        public CosmosLibraryStore()
        {
            CosmosDBRepository<LibraryItem>.Initialize();
        }

        public async Task Add(LibraryItem libraryItem)
        {
            await CosmosDBRepository<LibraryItem>.CreateItemAsync(libraryItem);
        }

        async public Task<IList<LibraryItem>> GetAllItems()
        {
            IEnumerable<LibraryItem> libraryItems = await CosmosDBRepository<LibraryItem>.GetAllItemsAsync();
            return libraryItems.ToList();
        }
    }
    
    /// <summary>
    /// Cosmos db APIs
    /// </summary>
    /// <typeparam name="T"></typeparam>
    static class CosmosDBRepository<T> where T : class
    {
        private static readonly string DatabaseId = ServerlessLibrarySettings.Database;
        private static readonly string CollectionId = ServerlessLibrarySettings.Collection;
        private static Container container;

        public static async Task<T> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<T> response = await container.ReadItemAsync<T>(id, PartitionKey.None);
                return response.Resource;
            }
            catch (CosmosException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
        }

        public static async Task<List<T>> GetAllItemsAsync()
        {
            FeedIterator<T> query = container.GetItemQueryIterator<T>(
                queryDefinition: null,
                requestOptions: new QueryRequestOptions() { MaxItemCount = -1 }); // NOTE: FeedOptions.EnableCrossPartitionQuery is removed in SDK v3 (https://docs.microsoft.com/en-us/azure/cosmos-db/sql/migrate-dotnet-v3?tabs=dotnet-v3#changes-to-feedoptions-queryrequestoptions-in-v30-sdk)

            List<T> results = new List<T>();
            using (query)
            {
                while (query.HasMoreResults)
                {
                    results.AddRange(await query.ReadNextAsync());
                }
            }

            return results;
        }

        public static async Task<T> CreateItemAsync(T item)
        {
            ItemResponse<T> response = await container.CreateItemAsync(item, PartitionKey.None);
            return response.Resource;
        }

        public static async Task<T> UpdateItemAsync(string id, T item)
        {
            ItemResponse<T> response = await container.UpsertItemAsync(item, PartitionKey.None);
            return response.Resource;
        }

        public static async Task DeleteItemAsync(string id)
        {
            await container.DeleteItemAsync<T>(id, PartitionKey.None);
        }

        public static void Initialize()
        {
            if (container == null)
            {
                CosmosClientBuilder cosmosClientBuilder = new CosmosClientBuilder(
                    ServerlessLibrarySettings.CosmosEndpoint,
                    ServerlessLibrarySettings.CosmosAuthkey);
                CosmosClient client = cosmosClientBuilder.Build();

                DatabaseResponse databaseResponse = client.CreateDatabaseIfNotExistsAsync(DatabaseId).Result;
                Database database = databaseResponse;

                ContainerResponse containerResponse = database.CreateContainerIfNotExistsAsync(id: CollectionId, partitionKeyPath: "/_partitionKey", throughput: 400).Result;
                container = containerResponse;
            }
        }
    }
}