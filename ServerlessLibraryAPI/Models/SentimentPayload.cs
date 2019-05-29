namespace ServerlessLibrary.Models
{
    public class SentimentPayload
    {
        public string Id { get; set; }
        public int LikeChanges { get; set; }
        public int DislikeChanges { get; set; }
    }
}
