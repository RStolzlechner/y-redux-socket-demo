using FluentMigrator.Runner;
using DemoServer;
using DemoServer.Helper;
using DemoServer.Hub;
using DemoServer.Infrastructure;
using DemoServer.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDemoItemRepository, DemoItemRepository>();

builder.Services.AddScoped<IDemoItemService, DemoItemService>();

builder.Services.AddSingleton<IActionStore, ActionStore>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new BaseActionJsonConverter());
});

builder.Services.AddSignalR(options =>
{
    options.KeepAliveInterval = TimeSpan.FromSeconds(10);
    options.EnableDetailedErrors = true;
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(120);
    options.MaximumReceiveMessageSize = 512 * 1024; //512 kB
});

// Add FluentMigrator
builder.Services.AddFluentMigratorCore()
    .ConfigureRunner(rb => rb
        .AddPostgres()
        .WithGlobalConnectionString(Constants.ConnectionString)
        .ScanIn(typeof(Program).Assembly).For.Migrations()
    );

//CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        x =>
        {
            x.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//CORS
app.UseCors();

app.MapControllers().WithOpenApi();
app.UseWebSockets();
app.MapHub<DemoItemHub>("demo-item-hub");

//Migrate the database
var scope = app.Services.CreateScope();
var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
migrator?.MigrateUp();

app.Run();
