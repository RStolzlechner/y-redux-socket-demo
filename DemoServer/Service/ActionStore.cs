using System.Collections.Concurrent;
using System.Data;
using DemoServer.Models.Actions;

namespace DemoServer.Service;

/// <inheritdoc/>
public class ActionStore : IActionStore
{
    private SemaphoreSlim _lock = new(1, 1);
    private ConcurrentDictionary<int, BaseAction> _actions = new();

    /// <inheritdoc/>
    public int VersionNumber => _actions.Count;
    
    /// <inheritdoc/>
    public Task WaitAsync()
    {
        return _lock.WaitAsync();
    }

    /// <inheritdoc/>
    public void Store(BaseAction successAction)
    {
        var add = _actions.TryAdd(VersionNumber, successAction);
        if (!add)
            throw new DataException("Failed to store action");
    }

    /// <inheritdoc/>
    public List<BaseAction> ActionsSince(int version)
    {
        var cnt = version;
        var list = new List<BaseAction>();
        while (cnt < VersionNumber)
        {
            if (_actions.TryGetValue(cnt, out var action))
                list.Add(action);
            else throw new DataException("something went wrong!");
            cnt++;
        }

        return list;
    }

    /// <inheritdoc/>
    public void ReleaseAsync()
    {
        _lock.Release();
    }
}