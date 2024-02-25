using DemoServer.Models;

namespace DemoServer.Infrastructure;

public interface IDemoTableRepository
{
    Task<IEnumerable<DemoItem>> GetAllAsync();
    Task<DemoItem?> GetByIdAsync(long id);
    
    Task<long> CreateAsync(DemoItem item);
    
    Task UpdateAsync(DemoItem item);
    
    Task DeleteAsync(long id);
}