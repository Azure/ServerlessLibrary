using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerlessLibrary
{
    /// <summary>
    /// Interface for serverless library store
    /// </summary>
    public interface ILibraryStore
    {
        /// <summary>
        /// Add an item to library
        /// </summary>
        /// <param name="libraryItem">Library item </param>
        void Add(LibraryItem libraryItem);

        /// <summary>
        /// Get all items from library
        /// </summary>
        /// <returns></returns>
        Task<IList<LibraryItem>> GetAllItems();

        /// <summary>
        /// Get count of items in the library
        /// </summary>
        /// <returns>count of items</returns>
        int Count();
    }
}