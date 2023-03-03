using Microsoft.EntityFrameworkCore;
using moviedb.Models;

namespace moviedb;

public partial class MariaDbContext : DbContext
{
    public static string ConnectionString = "Server=127.0.0.1; Port=3306; Database=moviedb; Uid=root; Pwd=abc123";

    public virtual DbSet<Movie> Movies { get; set; }
    public virtual DbSet<Actor> Actors { get; set; }
    public virtual DbSet<Director> Directors { get; set; }
    public virtual DbSet<Genre> Genres { get; set; }

    public MariaDbContext(DbContextOptions<MariaDbContext> options)
        : base(options)
    {
    }

    static public MariaDbContext CreateContext()
    {
        return new MariaDbContext(
            new DbContextOptionsBuilder<MariaDbContext>()
                .UseMySql(ConnectionString, ServerVersion.AutoDetect(ConnectionString))
                .Options
        );
    }
}

