using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace ServerlessLibraryFunctionApp
{
    public static class UpdateCounts
    {
        private static readonly TableRequestOptions tableRequestRetry = new TableRequestOptions { RetryPolicy = new LinearRetry(TimeSpan.FromSeconds(2), 3) };

        [FunctionName("UpdateCounts")]
        [Singleton]
        public static async Task Run([QueueTrigger("slitemstats")]string myQueueItemJson, [Table("slitemstats")] CloudTable table, ILogger log)
        {
            var payload = JsonConvert.DeserializeObject(((dynamic)myQueueItemJson));
            string id = payload.id.ToString();

            var userActionString = payload.userAction.ToString();
            log.LogInformation($"Id:{id}, UserAction: {userActionString}");
            UserAction userAction;
            if (!Enum.TryParse(userActionString, true, out userAction))
            {
                log.LogInformation($"Unknown user action received.");
                return;
            }

            int likeChanges = 0, dislikeChanges = 0;
            if (userAction == UserAction.Sentiment)
            {
                try
                {
                    likeChanges = (int)payload.likeChanges;
                    dislikeChanges = (int)payload.dislikeChanges;
                }
                catch (Exception ex)
                {
                    log.LogInformation($"Exception got in casting {ex}");
                }
            }

            string mainFilter = TableQuery.GenerateFilterCondition("id", QueryComparisons.Equal, id);
            TableQuery<SLItemStats> query = new TableQuery<SLItemStats>().Where(mainFilter);
            TableContinuationToken continuationToken = null;
            List<SLItemStats> entities = new List<SLItemStats>();
            var opContext = new OperationContext();
            do
            {
                TableQuerySegment<SLItemStats>
                queryResults = await (table).ExecuteQuerySegmentedAsync<SLItemStats>(query, continuationToken, tableRequestRetry, opContext);
                continuationToken = queryResults.ContinuationToken;
                entities.AddRange(queryResults.Results);

            } while (continuationToken != null);
            if (entities.Count == 0)
            {
                // Create new entry
                SLItemStats item = null;
                item = new SLItemStats()
                {
                    PartitionKey = Guid.NewGuid().ToString(),
                    RowKey = Guid.NewGuid().ToString(),
                    id = id,
                    totalDownloads = userAction == UserAction.Download ? 1 : 0,
                    lastUpdated = DateTime.UtcNow,
                    likes = likeChanges,
                    dislikes = dislikeChanges
                };

                // Create the TableOperation that inserts the itemStats entity.
                TableOperation insertOperation = TableOperation.Insert(item);

                // Execute the insert operation.
                await table.ExecuteAsync(insertOperation);

            }
            else
            {
                //Update existing entry
                var item = entities[0];
                switch (userAction)
                {
                    case UserAction.Download:
                        item.totalDownloads += 1;
                        break;
                    case UserAction.Sentiment:
                        item.likes += likeChanges;
                        item.dislikes += dislikeChanges;
                        break;
                    default:
                        log.LogInformation($"Unexpected user action.");
                        return;
                }

                TableOperation operation = TableOperation.InsertOrMerge(item);
                await table.ExecuteAsync(operation);
            }
        }
    }

    enum UserAction
    {
        Download,
        Sentiment
    }

    public class SLItemStats : TableEntity
    {
        public string id { get; set; }
        public int totalDownloads { get; set; }
        public DateTime lastUpdated { get; set; }
        public int likes { get; set; }
        public int dislikes { get; set; }

    }
}
