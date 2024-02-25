using System.Data;
using System.Transactions;

namespace DemoServer.Helper;

public static class TransactionHelper
{
    public static async Task<T> Execute<T>(Func<Task<T>> execution, int retries = 5)
    {
        var count = 0;
        while (count<retries)
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
    
    public static async Task Execute(Func<Task> execution, int retries = 5)
    {
        var count = 0;
        while (count<retries)
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