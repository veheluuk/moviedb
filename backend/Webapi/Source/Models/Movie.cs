namespace moviedb.Models;

public class Movie
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? Year { get; set; }
    public int? Rating { get; set; }
    public virtual List<Genre>? Genres { get; set; }
    public virtual List<Actor>? Actors { get; set; }
    public Director? Director { get; set; }
    public string? Synopsis { get; set; }
    public int? AgeLimit { get; set; }
}
