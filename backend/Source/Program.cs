using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using moviedb;
using moviedb.Services;
using moviedb.Tests;

var builder = WebApplication.CreateBuilder(args);

var dbConnectionString = builder.Configuration["Database:ConnectionString"];

Console.WriteLine(dbConnectionString);

builder.Services.AddDbContextPool<MariaDbContext>(
    options => options.UseMySql(dbConnectionString, ServerVersion.AutoDetect(dbConnectionString))
);

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(
//         name: "AllowLocalhost",
//         policy  =>
//     {
//         policy.WithOrigins("http://localhost").WithMethods("GET", "PUT", "DELETE");
//     });
// });

// Add services to the container.
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});

builder.Services.AddScoped<MovieService>();
builder.Services.AddScoped<TestDatabaseContext>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// TODO: Proper CORS config
app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed((host) => true)
    .AllowCredentials()
);

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { } // To enable Xunit testing
