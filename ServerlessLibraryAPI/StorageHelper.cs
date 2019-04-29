﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Queue;
using Microsoft.WindowsAzure.Storage.RetryPolicies;
using Microsoft.WindowsAzure.Storage.Table;

namespace ServerlessLibrary
{
    /// <summary>
    /// Summary description for StorageHelper
    /// </summary>
    public class StorageHelper
    {
        private const string slItemTableName = "slitemstats";
        private const string slContributionRequests = "contribution-requests";
        private static readonly TableRequestOptions tableRequestRetry = 
            new TableRequestOptions { RetryPolicy = new LinearRetry(TimeSpan.FromSeconds(2), 3) };

        private static CloudTableClient tableClient()
        {
            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = 
                CloudStorageAccount.Parse(ServerlessLibrarySettings.SLStorageString);

            // Create the table client.
            return storageAccount.CreateCloudTableClient();
        }

        private static CloudQueueClient cloudQueueClient()
        {
            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = 
                CloudStorageAccount.Parse(ServerlessLibrarySettings.SLStorageString);

            // Create the queue client.
            return storageAccount.CreateCloudQueueClient();
        }

        private static async Task<CloudTable> getTableReference(string tableName = slItemTableName)
        {
            CloudTable table = tableClient().GetTableReference(tableName);
            await table.CreateIfNotExistsAsync();
            return table;
        }

        private static async Task<CloudQueue> getQueueReference(string queueName)
        {
            CloudQueue queue = cloudQueueClient().GetQueueReference(queueName);
            await queue.CreateIfNotExistsAsync();
            return queue;
        }

        public static async Task submitContributionForApproval(string contributionPayload)
        {
            var message = new CloudQueueMessage(contributionPayload);
            await (await getQueueReference(slContributionRequests)).AddMessageAsync(message);
        }

        public static async Task updateUserStats(string statsPayload)
        {
            var message = new CloudQueueMessage(statsPayload);
            await (await getQueueReference(slItemTableName)).AddMessageAsync(message);
        }

        public static async Task<IEnumerable<SLItemStats>> getSLItemRecordsAsync()
        {
            TableQuery<SLItemStats> query = new TableQuery<SLItemStats>()
                .Select(new List<string> { "id", "totalDownloads", "likes", "dislikes" });
            TableContinuationToken continuationToken = null;
            List<SLItemStats> entities = new List<SLItemStats>();
            var opContext = new OperationContext();
            do
            {
                TableQuerySegment<SLItemStats> queryResults = 
                    await (await getTableReference()).ExecuteQuerySegmentedAsync<SLItemStats>(query, continuationToken, tableRequestRetry, opContext);
                continuationToken = queryResults.ContinuationToken;
                entities.AddRange(queryResults.Results);

            } while (continuationToken != null);
            return entities;
        }

        public async Task<SLItemStats> GetItem(string id)
        {
            TableOperation operation = TableOperation.Retrieve<SLItemStats>(id, id);

            TableResult result = await (await getTableReference()).ExecuteAsync(operation);

            return (SLItemStats)(dynamic)result.Result;
        }

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