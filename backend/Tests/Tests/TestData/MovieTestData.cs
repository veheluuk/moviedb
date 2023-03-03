using moviedb.Models;

namespace moviedb.Tests.TestData;

public class MovieTestData
{
    public static List<Movie> TestMovies = new List<Movie>
    {
        new Movie
        {
            Name = "Testielokuva 1",
            Year = 2001,
            Director = new Director
            {
                Firstname = "Ohjaaja",
                Lastname = "Olkkonen"
            },
            Synopsis = "Tiivistelmä",
            Rating = 5,
            Genres = new List<Genre>
            {
                new Genre { Name = "Scifi" }
            },
            AgeLimit = 18,
        },
        new Movie
        {
            Name = "Testielokuva 2",
            Year = 2001,
            Director = new Director
            {
                Firstname = "Ohjaaja",
                Lastname = "Olkkonen"
            },
            Synopsis = "Tiivistelmä",
            Rating = 5,
            Genres = new List<Genre>
            {
                new Genre { Name = "Komedia" }
            },
            AgeLimit = 13,
        }
    };

    public static Movie ExampleMovie = new Movie
    {
        Name = "Testielokuva 3",
        Year = 2001,
        Director = new Director
        {
            Firstname = "Ohjaaja",
            Lastname = "Muukkonen"
        },
        Synopsis = "Tiivistelmä",
        Rating = 5,
        Genres = new List<Genre>
        {
            new Genre { Name = "Kauhu" }
        },
        AgeLimit = 18,
    };
}