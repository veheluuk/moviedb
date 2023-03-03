using Microsoft.EntityFrameworkCore;
using System;

namespace moviedb.Models;

[Index(nameof(Name), IsUnique = true)]
public class Genre
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public virtual List<Movie>? Movies { get; set; }
}
