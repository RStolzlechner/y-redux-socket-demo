using Dapper;
using Npgsql;

namespace server.Infrastructure;

public class TestRepository : ITestRepository
{
    public async Task<string> Ping()
    {
        await using var connection = new NpgsqlConnection(Constants.ConnectionString);

        var sql = "SELECT \"Test\" from public.\"Test\" where \"Id\" = 1;";

        return await connection.QuerySingleAsync<string>(sql);
    }
}