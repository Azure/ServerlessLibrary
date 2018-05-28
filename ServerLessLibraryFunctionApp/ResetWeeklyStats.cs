using System;
using System.Collections.Generic;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using Microsoft.WindowsAzure.Storage.Table;

namespace ServerLessLibraryFunctionApp
{
    public static class ResetWeeklyStats
    {
        private static readonly TableRequestOptions tableRequestRetry = new TableRequestOptions { RetryPolicy = new LinearRetry(TimeSpan.FromSeconds(2), 3) };
        [Singleton]
        [FunctionName("ResetWeeklyStats")]
        public static async void Run([TimerTrigger("15 0 0 * * 1")]TimerInfo myTimer, [Table("slitemstats")] CloudTable table,TraceWriter log)
        {
            log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
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
                    //increment
                    item.downloadsThisWeek = 0;
                    TableOperation operation = TableOperation.InsertOrMerge(item);
                    await table.ExecuteAsync(operation);
                }

            }
        }
    }
}
