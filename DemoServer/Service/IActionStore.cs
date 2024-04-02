using DemoServer.Models.Actions;

namespace DemoServer.Service;

/// <summary>
/// Singleton service to store a list of all dispatched actions
/// </summary>
public interface IActionStore
{
    /// <summary>
    /// the actual version number
    /// </summary>
    int VersionNumber { get; }
    
    /// <summary>
    /// wait for the lock to be released and lock it afterwards
    /// </summary>
    /// <returns></returns>
    Task WaitAsync();
    
    /// <summary>
    /// store a dispatched action
    /// </summary>
    /// <param name="successAction"></param>
    void Store(BaseAction successAction);

    /// <summary>
    /// list of all actions since a given version
    /// </summary>
    List<BaseAction> ActionsSince(int version);
    
    /// <summary>
    /// release the lock
    /// </summary>
    void ReleaseAsync();
}