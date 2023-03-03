using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using moviedb.Models;
using System.Net;

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
            .AsNoTracking()
            .Include(movie => movie.Actors)
            .Include(movie => movie.Director)
            .Include(movie => movie.Genres)
            .ToListAsync();
    }

    // TODO: This should be implemented "transactional"
    public async Task<Movie> Insert(Movie movie)
    {
        if (movie.Actors is not null)
        {
            movie.Actors = movie.Actors.Select(
                actor =>
                {
                    return _dbContext.Actors.FirstOrDefault(
                        a => a.Firstname == actor.Firstname && a.Lastname == actor.Lastname) ?? actor;
                }
            ).ToList();
        }

        if (movie.Director is not null)
        {
            movie.Director = _dbContext.Directors
                .FirstOrDefault(d => d.Firstname == movie.Director.Firstname && d.Lastname == movie.Director.Lastname) ?? movie.Director;
        }

        if (movie.Genres is not null)
        {
            movie.Genres = movie.Genres.Select(
                genre =>
                {
                    return _dbContext.Genres.FirstOrDefault(g => g.Name == genre.Name) ?? genre;
                }
            ).ToList();
        }

        await _dbContext.AddAsync(movie);
        await _dbContext.SaveChangesAsync();

        return movie;
    }

    public async Task<Movie> Update(Movie movie)
    {
        _dbContext.Update(movie);
        await _dbContext.SaveChangesAsync();
        return movie;
    }

    public async Task<int> Delete(int id)
    {
        var movie = _dbContext.Movies.FirstOrDefault(movie => movie.Id == id);

        if (movie == null)
        {
            throw new Exception();
        }

        _dbContext.Movies.Remove(movie);
        await _dbContext.SaveChangesAsync();

        return movie.Id;
    }
}
