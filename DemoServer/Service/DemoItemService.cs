using DemoServer.Helper;
using DemoServer.Infrastructure;
using DemoServer.Models;

namespace DemoServer.Service;

/// <summary>
/// Represents a service class for performing operations on DemoItem objects.
/// </summary>
public class DemoItemService(IDemoItemRepository demoItemRepository) : IDemoItemService
{
    /// <inheritdoc cref="IDemoItemService"/>
    public Task<IEnumerable<DemoItem>> GetAllAsync() => demoItemRepository.GetAllAsync();

    /// <inheritdoc cref="IDemoItemService"/>
    public Task<DemoItem?> GetByIdAsync(long id) => demoItemRepository.GetByIdAsync(id);

    /// <inheritdoc cref="IDemoItemService"/>
    public Task<long> CreateAsync(DemoItem item) => 
        TransactionHelper.Execute(() => demoItemRepository.CreateAsync(item));

    /// <inheritdoc cref="IDemoItemService"/>
    public Task UpdateAsync(DemoItem item) =>
        TransactionHelper.Execute(() => demoItemRepository.UpdateAsync(item));

    /// <inheritdoc cref="IDemoItemService"/>
    public Task DeleteAsync(long id) =>
        TransactionHelper.Execute(() => demoItemRepository.DeleteAsync(id));
}