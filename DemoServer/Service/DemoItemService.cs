using DemoServer.Helper;
using DemoServer.Infrastructure;
using DemoServer.Models;

namespace DemoServer.Service;

public class DemoItemService(IDemoItemRepository demoItemRepository) : IDemoItemService
{
    public Task<IEnumerable<DemoItem>> GetAllAsync() => demoItemRepository.GetAllAsync();

    public Task<DemoItem?> GetByIdAsync(long id) => demoItemRepository.GetByIdAsync(id);

    public Task<long> CreateAsync(DemoItem item) => 
        TransactionHelper.Execute(() => demoItemRepository.CreateAsync(item));

    public Task UpdateAsync(DemoItem item) =>
        TransactionHelper.Execute(() => demoItemRepository.UpdateAsync(item));

    public Task DeleteAsync(long id) =>
        TransactionHelper.Execute(() => demoItemRepository.DeleteAsync(id));
}