using DemoServer.Infrastructure;

namespace DemoServer.Service;

public class DemoItemService(IDemoTableRepository demoTableRepository) : IDemoItemService
{
    public async Task<string> Ping()
    {
        var result = await demoTableRepository.GetByIdAsync(1);
        if(result is null) return "No result";
        return result.Name;
    }
}