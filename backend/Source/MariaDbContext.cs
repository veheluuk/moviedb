using Microsoft.EntityFrameworkCore;
using moviedb.Models;

namespace moviedb;

public partial class MariaDbContext : DbContext
{
    public MariaDbContext(DbContextOptions<MariaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Movie> Movies { get; set; }
    public virtual DbSet<Actor> Actors { get; set; }
    public virtual DbSet<Director> Directors { get; set; }
}

