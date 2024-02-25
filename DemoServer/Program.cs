using FluentMigrator.Runner;
using DemoServer;
using DemoServer.Hub;
using DemoServer.Infrastructure;
using DemoServer.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDemoItemRepository, DemoItemRepository>();

builder.Services.AddScoped<IDemoItemService, DemoItemService>();

builder.Services.AddControllers();

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
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
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
app.MapHub<TestHub>("test-hub");
app.MapHub<YReduxSocketHub>("y-redux-socket-hub");

//Migrate the database
var scope = app.Services.CreateScope();
var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
migrator?.MigrateUp();

app.Run();
