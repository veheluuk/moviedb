using moviedb.Controllers;
using moviedb.Services;
using moviedb.Tests.TestData;
using Xunit;

namespace moviedb.Tests;

public class MoviesControllerTests : IDisposable
{
    private TestDatabaseContext fixture;
    private readonly MovieService movieService;
    private readonly MoviesController moviesController;

    public MoviesControllerTests()
    {
        fixture = new TestDatabaseContext();
        movieService = new MovieService(fixture.dbContext);
        moviesController = new MoviesController(movieService);
    }

    public void Dispose()
    {
        fixture.Dispose();
    }

    [Fact]
    public async void TestThatGetMethodWorks()
    {
        var movies = await moviesController.Get();

        Assert.Equal(MovieTestData.TestMovies.Count(), movies.Count());
    }

    [Fact]
    public async void TestThatPostMethodWorks()
    {
        //var movieService = new MovieService(fixture.dbContext);
        //var moviesController = new MoviesController(movieService);
        var movies = await moviesController.Get();

        Assert.Equal(MovieTestData.TestMovies.Count(), movies.Count());

        await moviesController.Post(MovieTestData.ExampleMovie);

        movies = await moviesController.Get();

        Assert.Equal(MovieTestData.TestMovies.Count() + 1, movies.Count());
    }
}
