using FluentMigrator;

namespace Migrations;

[Migration(202402231707)]
public class Migration_202402231707 : Migration
{
    public override void Up()
    {
        Create.Table("Test")
            .WithColumn("Id").AsInt64().PrimaryKey().Identity()
            .WithColumn("Test").AsString();
    }

    public override void Down()
    {
        Delete.Table("Test");
    }
}