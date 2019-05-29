using System;
using System.Reflection;
using System.IO;
using ServerlessLibrary.Models;
using System.Collections.Generic;
using Newtonsoft.Json;
using ServerlessLibrary;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using System.Threading.Tasks;
using System.Linq;

namespace LibraryStoreMigration
{
    class Program
    {
        const string tableName = "slitemstats";
        static void Main(string[] args)
        {
            if (args.Length < 1)
            {
                Console.WriteLine("Please enter specify operation to be performed (cosmosdb|stats)");
                Console.WriteLine("Please note that connection informations need to be provided as environment variables.");
                return;
            }

            if (args[0].Equals("cosmosdb", StringComparison.OrdinalIgnoreCase))
            {
                MigrateToCosmosDB();
            }

            if (args[0].Equals("stats", StringComparison.OrdinalIgnoreCase))
            {
                AddNewStatsColumns();
            }
        }

        public static void AddNewStatsColumns()
        {
            TableRequestOptions tableRequestRetry = new TableRequestOptions { RetryPolicy = new LinearRetry(TimeSpan.FromSeconds(2), 3) };
            TableQuery<NewSLItemStats> query = new TableQuery<NewSLItemStats>();
            TableContinuationToken continuationToken = null;
            List<NewSLItemStats> entities = new List<NewSLItemStats>();
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ServerlessLibrarySettings.SLStorageString);

            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            CloudTable table = tableClient.GetTableReference(tableName);
            var opContext = new OperationContext();
            do
            {
                TableQuerySegment<NewSLItemStats> queryResults = (table).ExecuteQuerySegmentedAsync(query, continuationToken, tableRequestRetry, opContext).Result;
                continuationToken = queryResults.ContinuationToken;
                entities.AddRange(queryResults.Results);
            } while (continuationToken != null);

            Console.WriteLine(entities.Count);
            List<LibraryItem> libraryItems = GetAllLibraryItemsFromFile();
            foreach (var entity in entities)
            {
                entity.id = libraryItems.FirstOrDefault(l => l.Template == entity.template).Id;
                entity.likes = 0;
                entity.dislikes = 0;
                TableOperation operation = TableOperation.InsertOrMerge(entity);
                Task<TableResult> r = table.ExecuteAsync(operation);
                TableResult a = r.Result;
            }
        }

        public static void MigrateToCosmosDB()
        {
            var libraryItems = GetAllLibraryItemsFromFile();
            Console.WriteLine("Number of samples to be migrated from file to cosmos db: {0}", libraryItems.Count);
            CosmosLibraryStore libraryStore = new CosmosLibraryStore();

            IList<LibraryItem> libraryItemsInCosmos = libraryStore.GetAllItems().Result;
            Console.WriteLine("Number of samples already present in cosmos db: {0}", libraryItemsInCosmos.Count);

            if (libraryItemsInCosmos.Count != libraryItems.Count)
            {
                foreach (LibraryItem libraryItem in libraryItems)
                {
                    if (!libraryItemsInCosmos.Any(c => c.Id == libraryItem.Id))
                    {
                        Console.WriteLine("Item {0} not present in cosmos db. will be migrated" + libraryItem.Id);
                        try
                        {
                            libraryStore.Add(libraryItem).Wait();
                            Console.WriteLine("Migrated sample with id {0}" + libraryItem.Id);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Got exception {0}", ex);
                            throw;
                        }
                    }
                }

                Console.WriteLine("Samples are successfully migrated to cosmos db");
            }
            else
            {
                Console.WriteLine("Samples are already migrated to cosmos db");
            }
        }

        public static List<LibraryItem> GetAllLibraryItemsFromFile()
        {
            var assembly = Assembly.GetExecutingAssembly();
            using (Stream stream = assembly.GetManifestResourceStream("LibraryStoreMigration.items.json"))
            using (StreamReader reader = new StreamReader(stream))
            {
                string result = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<List<LibraryItem>>(result);
            }
        }
    }

    public class OldSLItemStats : TableEntity
    {
        public string template { get; set; }
        public int totalDownloads { get; set; }
        public int downloadsToday { get; set; }
        public int downloadsThisWeek { get; set; }
        public int downloadsThisMonth { get; set; }
        public DateTime lastUpdated { get; set; }
    }

    public class NewSLItemStats : OldSLItemStats
    {
        public string id { get; set; }
        public int likes { get; set; }
        public int dislikes { get; set; }
    }
}
