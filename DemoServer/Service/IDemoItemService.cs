using DemoServer.Models;

namespace DemoServer.Service;

public interface IDemoItemService
{
    Task<IEnumerable<DemoItem>> GetAllAsync();
    Task<DemoItem?> GetByIdAsync(long id);
    Task<long> CreateAsync(DemoItem item);
    Task UpdateAsync(DemoItem item);
    Task DeleteAsync(long id);
}