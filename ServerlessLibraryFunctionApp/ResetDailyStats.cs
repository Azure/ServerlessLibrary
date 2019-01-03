using System;
using System.Collections.Generic;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using Microsoft.WindowsAzure.Storage.Table;

namespace ServerlessLibraryFunctionApp
{
    public static class ResetDailyStats
    {
        private static readonly TableRequestOptions tableRequestRetry = new TableRequestOptions { RetryPolicy = new LinearRetry(TimeSpan.FromSeconds(2), 3) };
        [Singleton]
        [FunctionName("ResetDailyStats")]
        public static async void Run([TimerTrigger("0 0 0  * * *")]TimerInfo myTimer, [Table("slitemstats")] CloudTable table, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            string mainFilter1 = TableQuery.GenerateFilterCondition("template", QueryComparisons.NotEqual, String.Empty);

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
            foreach (var item in entities) {
                {
                    //reset
                    log.LogInformation($"Resetting daily stats");
                    item.downloadsToday = 0;
                    if (DateTime.UtcNow.DayOfWeek == DayOfWeek.Sunday)
                    {
                        log.LogInformation($"Resetting weekly stats");
                        item.downloadsThisWeek = 0;
                    }
                    if (DateTime.UtcNow.Day == 1)
                    {
                        log.LogInformation($"Resetting monthly stats");
                        item.downloadsThisMonth = 0;
                    }
                    TableOperation operation = TableOperation.InsertOrMerge(item);
                    await table.ExecuteAsync(operation);
                }

            }
        }
    }
}
