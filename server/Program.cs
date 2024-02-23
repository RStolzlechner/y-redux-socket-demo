using FluentMigrator.Runner;
using Infrastructure;
using Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ITestRepository, TestRepository>();

builder.Services.AddScoped<ITestService, TestService>();

builder.Services.AddControllers();

// Add FluentMigrator
builder.Services.AddFluentMigratorCore()
    .ConfigureRunner(rb => rb
        .AddPostgres()
        .WithGlobalConnectionString($@"
            User ID = i_am_dev_user;
            Password = myshinynewpassword;
            Host = localhost;
            Port = 5327;
            Database = dev_db;")
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
                .AllowAnyMethod();
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

//Migrate the database
var scope = app.Services.CreateScope();
var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
migrator?.MigrateUp();

app.Run();
