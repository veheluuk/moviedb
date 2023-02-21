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
}
