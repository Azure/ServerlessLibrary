using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace ServerLessLibrary
{
    public static class ServerLessLibrarySettings
    {
        private static string config(string @default = null, [CallerMemberName] string key = null)
        {
            var value = System.Environment.GetEnvironmentVariable(key) ?? ConfigurationManager.AppSettings[key];
            return string.IsNullOrEmpty(value)
                ? @default
                : value;
        }

        public static string SLStorageString { get { return config(); } }
        public static string SLAppInsightsKey { get { return config(""); } }
        public static int SLCacheRefreshIntervalInSeconds { get { return Int32.Parse(config("60")); } }
        public static string CACHE_ENTRY = "_CacheEntry";

    }

}
