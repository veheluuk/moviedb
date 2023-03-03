namespace moviedb.Models;

public class Actor
{
    public int Id { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public virtual List<Movie>? Movies { get; set; }
}