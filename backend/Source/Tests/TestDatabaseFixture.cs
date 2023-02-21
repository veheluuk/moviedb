using Microsoft.EntityFrameworkCore;
using moviedb.Tests.TestData;

namespace moviedb.Tests;

public class TestDatabaseContext : IDisposable
{
    private const string ConnectionString = "Server=127.0.0.1; Port=3306; Database=moviedb_test; Uid=root; Pwd=abc123";

    public MariaDbContext dbContext { get; private set; }

    public TestDatabaseContext()
    {
        dbContext = new MariaDbContext(
            new DbContextOptionsBuilder<MariaDbContext>()
                .UseMySql(ConnectionString, ServerVersion.AutoDetect(ConnectionString))
                .Options
        );

        dbContext.Database.EnsureDeleted();
        dbContext.Database.EnsureCreated();

        dbContext.AddRange(MovieTestData.TestMovies);

        dbContext.SaveChanges();
    }

    public void Dispose()
    {
        dbContext.Database.EnsureDeleted();
        dbContext.Dispose();
    }
}