using FluentMigrator;

namespace Migrations;

[Migration(202402231707)]
public class Migration_202402231707 : Migration
{
    public override void Up()
    {
        Create.Table("demo_table")
            .WithColumn("id").AsInt64().PrimaryKey().Identity()
            .WithColumn("a_string").AsString();
    }

    public override void Down()
    {
        Delete.Table("demo_table");
    }
}