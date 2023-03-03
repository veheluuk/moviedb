using Microsoft.AspNetCore.Mvc;
using moviedb.Models;
using moviedb.Services;

namespace moviedb.Controllers;

[ApiController]
[Route("[controller]")]
public class MoviesController : ControllerBase
{
    private readonly MovieService _movieService;
    
    public MoviesController(MovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public async Task<IEnumerable<Movie>> Get()
    {
        return await _movieService.FindAll();
    }
    
    [HttpPost]
    public async Task<Movie> Post(Movie movie)
    {
        return await _movieService.Insert(movie);
    }

    [HttpPut]
    public async Task<Movie> Put(Movie movie)
    {
        return await _movieService.Update(movie);
    }

    [HttpDelete("{id:int}")]
    public async Task<int> Delete(int id)
    {
        return await _movieService.Delete(id);
    }
}
