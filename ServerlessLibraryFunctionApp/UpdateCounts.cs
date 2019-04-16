using System;
using System.Collections.Generic;
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
        public static async void Run([QueueTrigger("slitemstats")]string myQueueItemJson, [Table("slitemstats")] CloudTable table, ILogger log)
        {
            var payload = JsonConvert.DeserializeObject(((dynamic)myQueueItemJson));
            string template = payload.template.ToString();
            var userActionString = payload.userAction.ToString();
            log.LogInformation($"Template:{template}, UserAction: {userActionString}");
            UserAction userAction;
            if (!Enum.TryParse(userActionString, true, out userAction))
            {
                log.LogInformation($"Unknown user action received.");
                return;
            }

            string mainFilter = TableQuery.GenerateFilterCondition("template", QueryComparisons.Equal, template);
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
                if (userAction == UserAction.Unlike)
                {
                    log.LogInformation($"Unexpected user action. Unlike is not allowed if item has not received a single like.");
                    return;
                }

                // Create new entry
                SLItemStats item = null;
                if (userAction== UserAction.Like)
                {

                    item = new SLItemStats()
                    {
                        PartitionKey = Guid.NewGuid().ToString(),
                        RowKey = Guid.NewGuid().ToString(),
                        template = template,
                        totalDownloads = 0,
                        downloadsThisMonth = 0,
                        downloadsThisWeek = 0,
                        downloadsToday = 0,
                        lastUpdated = DateTime.UtcNow,
                        likes = 1
                    };
                } 
                else
                {
                    // download
                    item = new SLItemStats()
                    {
                        PartitionKey = Guid.NewGuid().ToString(),
                        RowKey = Guid.NewGuid().ToString(),
                        template = template,
                        totalDownloads = 1,
                        downloadsThisMonth = 1,
                        downloadsThisWeek = 1,
                        downloadsToday = 1,
                        lastUpdated = DateTime.UtcNow,
                        likes = 0
                    };
                }

                // Create the TableOperation that inserts the itemStats entity.
                TableOperation insertOperation = TableOperation.Insert(item);

                // Execute the insert operation.
                await table.ExecuteAsync(insertOperation);
    
            }
            else
            {
                //Update existing entry
                var item = entities[0];
                if (userAction== UserAction.Unlike)
                {
                    if (item.likes > 0)
                    {
                        item.likes -= 1;
                    }
                    else
                    {
                        log.LogInformation($"Unexpected user action. Unlike is not allowed if item has not received a single like.");
                        return;
                    }

                      
                }
                else if (userAction == UserAction.Like)
                {
                    item.likes += 1;                               
                }
                else
                {
                    item.downloadsThisMonth += 1;
                    item.downloadsThisWeek += 1;
                    item.downloadsToday += 1;
                    item.totalDownloads += 1;
                }

                TableOperation operation = TableOperation.InsertOrMerge(item);
                await table.ExecuteAsync(operation);         
            }

        }
    }

    enum UserAction
    {
        Download,
        Like,
        Unlike
    }

    public class SLItemStats : TableEntity
    {
        public string template { get; set; }
        public int totalDownloads { get; set; }
        public int downloadsToday { get; set; }
        public int downloadsThisWeek { get; set; }
        public int downloadsThisMonth { get; set; }
        public DateTime lastUpdated { get; set; }
        public int likes { get; set; }

    }
}
