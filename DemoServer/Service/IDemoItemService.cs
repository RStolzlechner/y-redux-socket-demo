using DemoServer.Models;

namespace DemoServer.Service;

/// <summary>
/// Represents a service for working with DemoItem entities.
/// </summary>
public interface IDemoItemService
{
    /// <summary>
    /// Retrieves all the DemoItems asynchronously.
    /// </summary>
    /// <returns>
    /// A <see cref="Task"/> representing the asynchronous operation.
    /// The task result contains an <see cref="IEnumerable{T}"/> of <see cref="DemoItem"/>.
    /// </returns>
    Task<IEnumerable<DemoItem>> GetAllAsync();

    /// <summary>
    /// Retrieves a DemoItem with the specified ID asynchronously.
    /// </summary>
    /// <param name="id">The ID of the DemoItem to retrieve.</param>
    /// <returns>A Task representing the asynchronous operation. The Task's result contains the retrieved DemoItem, or null if no matching DemoItem is found.</returns>
    Task<DemoItem?> GetByIdAsync(long id);

    /// <summary>
    /// Creates a new DemoItem asynchronously.
    /// </summary>
    /// <param name="item">The DemoItem to create.</param>
    /// <returns>A Task representing the asynchronous operation. A long value representing the id of the newly created DemoItem.</returns>
    Task<long> CreateAsync(DemoItem item);

    /// <summary>
    /// Updates the specified <paramref name="item"/>.
    /// </summary>
    /// <param name="item">The <see cref="DemoItem"/> to be updated.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task UpdateAsync(DemoItem item);

    /// <summary>
    /// Deletes a record asynchronously based on the specified ID.
    /// </summary>
    /// <param name="id">The ID of the record to delete.</param>
    /// <returns>A Task representing the asynchronous operation.</returns>
    Task DeleteAsync(long id);

    /// <summary>
    /// Duplicates a demo item based on the given id
    /// </summary>
    /// <param name="id">the id of the item which should be duplicated</param>
    /// <returns>the duplicated item</returns>
    Task<DemoItem?> DuplicateAsync(long id);
}