using System.Collections.Generic;
using System.Threading.Tasks;
using ServerlessLibrary.Models;

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
        Task Add(LibraryItem libraryItem);

        /// <summary>
        /// Get all items from library
        /// </summary>
        /// <returns></returns>
        Task<IList<LibraryItem>> GetAllItems();
    }
}