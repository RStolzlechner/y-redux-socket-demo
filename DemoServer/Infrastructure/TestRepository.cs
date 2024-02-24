using Dapper;
using Npgsql;

namespace DemoServer.Infrastructure;

public class TestRepository : ITestRepository
{
    public async Task<string> Ping()
    {
        await using var connection = new NpgsqlConnection(Constants.ConnectionString);

        var sql = "select a_string from demo_table where id = 1;";

        return await connection.QuerySingleAsync<string>(sql);
    }
}