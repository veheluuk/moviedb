using Microsoft.EntityFrameworkCore;
using moviedb.Models;

namespace moviedb.Services;

public sealed class MovieService
{
    private readonly MariaDbContext _dbContext;

    public MovieService(MariaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Movie>> FindAll()
    {
        return await _dbContext.Movies
            .Include(movie => movie.Actors)
            .Include(movie => movie.Director)
            .Include(movie => movie.Genres)
            .ToListAsync();
    }
        
    public async Task<Movie> Insert(Movie movie)
    {
        _dbContext.Add(movie);
        await _dbContext.SaveChangesAsync();
        return movie;
    }
}
