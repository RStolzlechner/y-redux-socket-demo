using System.Data;
using Dapper;
using DemoServer.Models;
using Npgsql;

namespace DemoServer.Infrastructure;

public class DemoItemRepository : IDemoItemRepository
{
    public async Task<IEnumerable<DemoItem>> GetAllAsync()
    {
        await using var connection = new NpgsqlConnection(Constants.ConnectionString);

        var sql = "select * from demo_item;";
        return await connection.QueryAsync<DemoItem>(sql);
    }

    public async Task<DemoItem?> GetByIdAsync(long id)
    {
        await using var connection = new NpgsqlConnection(Constants.ConnectionString);
        
        var sql = "select * from demo_item where id = @id;";
        return await connection.QuerySingleOrDefaultAsync<DemoItem>(sql, new { id });
    }

    public async Task<long> CreateAsync(DemoItem item)
    {
        await using var connection = new NpgsqlConnection(Constants.ConnectionString);
        
        var sql = "insert into demo_item (name, description) values (@Name, @Description) returning id;";
        return await connection.ExecuteScalarAsync<long>(sql, item);
    }

    public async Task UpdateAsync(DemoItem item)
    {
        await using var connection = new NpgsqlConnection(Constants.ConnectionString);
        
        var sql = "update demo_item set name = @Name, description = @Description where id = @Id;";
        await connection.ExecuteAsync(sql, item);
    }

    public async Task DeleteAsync(long id)
    {
        await using var connection = new NpgsqlConnection(Constants.ConnectionString);
        
        var sql = "delete from demo_item where id = @id;";
        await connection.ExecuteAsync(sql, new { id });
    }
}