namespace DemoServer.Models;

/// <summary>
/// response dto when load demo items is called
/// </summary>
public record LoadDemoItemsResponse(IEnumerable<DemoItem> Items, int Version);