using FluentMigrator;

namespace Migrations;

[Migration(202402231707, "Create demonstration table")]
public class Migration_202402231707 : Migration
{
    public override void Up()
    {
        Create.Table("demo_item")
            .WithColumn("id").AsInt64().PrimaryKey().Identity()
            .WithColumn("name").AsString().NotNullable()
            .WithColumn("description").AsString().Nullable();
        
        Insert.IntoTable("demo_item").Row(new { name = "First item", description = "This is a demo" });
    }

    public override void Down()
    {
        Delete.Table("demo_item");
    }
}