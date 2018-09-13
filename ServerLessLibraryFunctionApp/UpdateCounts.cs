using System;
using System.Collections.Generic;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace ServerLessLibraryFunctionApp
{
    public static class UpdateCounts
    {
        private static readonly TableRequestOptions tableRequestRetry = new TableRequestOptions { RetryPolicy = new LinearRetry(TimeSpan.FromSeconds(2), 3) };

        [FunctionName("UpdateCounts")]
        [Singleton]
        public static async void Run([QueueTrigger("slitemstats")]string myQueueItemJson, [Table("slitemstats")] CloudTable table, TraceWriter log)
        {
            var myQueueItem = JsonConvert.DeserializeObject( ((dynamic)myQueueItemJson)).template;
            log.Info($"C# Queue trigger function processed: {myQueueItem}");
            string mainFilter1 = TableQuery.GenerateFilterCondition("template", QueryComparisons.Equal, myQueueItem.ToString());

            TableQuery<SLItemStats> query = new TableQuery<SLItemStats>().Where(mainFilter1);
            TableContinuationToken continuationToken = null;
            List<SLItemStats> entities = new List<SLItemStats>();
            var opContext = new OperationContext();
            do
            {
                TableQuerySegment<SLItemStats>
                queryResults = await(table).ExecuteQuerySegmentedAsync<SLItemStats>(query, continuationToken, tableRequestRetry, opContext);
                continuationToken = queryResults.ContinuationToken;
                entities.AddRange(queryResults.Results);

            } while (continuationToken != null);
            if (entities.Count == 0)
            {
                // Create a new itemStats entity.
                SLItemStats item = new SLItemStats() { PartitionKey = Guid.NewGuid().ToString(), RowKey = Guid.NewGuid().ToString(), template = myQueueItem,
                    totalDownloads = 1, downloadsThisMonth=1, downloadsThisWeek=1,downloadsToday=1 ,lastUpdated=DateTime.UtcNow};
                // Create the TableOperation that inserts the itemStats entity.
                TableOperation insertOperation = TableOperation.Insert(item);

                // Execute the insert operation.
                await table.ExecuteAsync(insertOperation);
            }
            else
            {
                //increment
                var item = entities[0];
                item.downloadsThisMonth += 1;
                item.downloadsThisWeek += 1;
                item.downloadsToday += 1;
                item.totalDownloads += 1;
                TableOperation operation = TableOperation.InsertOrMerge(item) ;
                await table.ExecuteAsync(operation);
            }

        }
    }

    public class SLItemStats : TableEntity
    {
        public string template { get; set; }
        public int totalDownloads { get; set; }
        public int downloadsToday { get; set; }
        public int downloadsThisWeek { get; set; }
        public int downloadsThisMonth { get; set; }
        public DateTime lastUpdated { get; set; }

    }
}
