using DemoServer.Models;

namespace DemoServer.Infrastructure;

/// <summary>
/// Represents a repository for managing <see cref="DemoItem"/> entities.
/// </summary>
public interface IDemoItemRepository
{
    /// <summary>
    /// Retrieves all the DemoItems asynchronously.
    /// </summary>
    /// <returns>
    /// Returns a Task object representing an asynchronous operation that returns
    /// an IEnumerable DemoItem containing all the DemoItems.
    /// </returns>
    Task<IEnumerable<DemoItem>> GetAllAsync();

    /// <summary>
    /// Retrieves a DemoItem by its ID asynchronously.
    /// </summary>
    /// <param name="id">The ID of the DemoItem to retrieve.</param>
    /// <returns>A Task representing the asynchronous operation. The task result contains the retrieved DemoItem, or null if it doesn't exist.</returns>
    Task<DemoItem?> GetByIdAsync(long id);

    /// <summary>
    /// Creates a new DemoItem asynchronously.
    /// </summary>
    /// <param name="item">The DemoItem to be created.</param>
    /// <returns>A Task that represents the asynchronous create operation. The Task will contain the ID of the newly created DemoItem upon completion.</returns>
    Task<long> CreateAsync(DemoItem item);

    /// <summary>
    /// Updates the DemoItem asynchronously.
    /// </summary>
    /// <param name="item">The DemoItem to be updated.</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    Task UpdateAsync(DemoItem item);

    /// <summary>
    /// Deletes an item with the specified id asynchronously.
    /// </summary>
    /// <param name="id">The id of the item to be deleted.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task DeleteAsync(long id);
}