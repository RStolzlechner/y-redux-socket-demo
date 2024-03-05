using System.Data;
using System.Transactions;

namespace DemoServer.Helper;

/// <summary>
/// A helper class for managing transactions in a simplified manner.
/// </summary>
public static class TransactionHelper
{
    /// <summary>
    /// Executes a provided asynchronous function in a transaction and returns the result.
    /// The function will be retried a specified number of times in case of exceptions.
    /// </summary>
    /// <typeparam name="T">The type of the result.</typeparam>
    /// <param name="execution">The asynchronous function to execute.</param>
    /// <param name="retries">The number of retries in case of exceptions. Default value is 5.</param>
    /// <returns>The result of the execution.</returns>
    /// <exception cref="DataException">Thrown if the transaction fails to commit after the specified number of retries.</exception>
    public static async Task<T> Execute<T>(Func<Task<T>> execution, int retries = 5)
    {
        var count = 0;
        while (count < retries)
        {
            try
            {
                using var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
                var result = await execution.Invoke();
                transactionScope.Complete();
                return result;
            }
            catch (Exception)
            {
                count++;
            }
        }
        throw new DataException("Postgres is not able to commit the transaction");
    }

    /// <summary>
    /// Executes the provided asynchronous function within a transaction scope, with the ability to retry a specified number of times on failure.
    /// </summary>
    /// <param name="execution">The asynchronous function to execute within the transaction scope.</param>
    /// <param name="retries">The number of times to retry the execution in case of failure. Default value is 5.</param>
    /// <exception cref="DataException">Thrown when Postgres is not able to commit the transaction after the specified number of retries.</exception>
    public static async Task Execute(Func<Task> execution, int retries = 5)
    {
        var count = 0;
        while (count < retries)
        {
            try
            {
                using var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
                await execution.Invoke();
                transactionScope.Complete();
                return;
            }
            catch (Exception)
            {
                count++;
            }
        }
        throw new DataException("Postgres is not able to commit the transaction");
    }
}