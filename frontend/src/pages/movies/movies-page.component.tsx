import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import MovieListFilter from 'pages/movies/components/movie-list-filter.component';
import MovieDialog from 'pages/movies/components/movie-dialog.component';
import MovieList from 'pages/movies/components/movie-list.component';
import MovieInterface from 'interfaces/movie.interface';
import { constants } from "config/constants";

export default function MoviesPage() {
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  // Fetch movies at startup and sort them in alphabetical order
  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies based on keyword
  useEffect(() => {
    setFilteredMovies(searchTerm === '' ? movies : movies.filter((movie) => {
        return movie.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
          movie.synopsis.toUpperCase().includes(searchTerm.toUpperCase());
      }
    ))
  }, [searchTerm, movies]);

  useEffect(() => {
    console.log(`Error`, error);
  }, [error])

  const fetchMovies = () => {
    fetch(`${constants.apiUrl}/Movies`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => setMovies(data.sort((a: MovieInterface, b: MovieInterface) => a.name.localeCompare(b.name))))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }
  
  const addMovie = (movie: MovieInterface) => {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(movie)
    };

    fetch(`${constants.apiUrl}/Movies`, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(movie => {
        setMovies(
          [
            ...movies,
            movie
          ].sort((a: MovieInterface, b: MovieInterface) => a.name.localeCompare(b.name))
        );
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <React.Fragment>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress/>
        </Box>
      </React.Fragment>
    );
  } else {
    const filteredMoviesOrWarning = filteredMovies.length > 0
      ? <MovieList movies={filteredMovies}/>
      : <Typography variant="subtitle1">None of the movies match search term <em>{`"${searchTerm}"`}</em></Typography>;

    return (
      <React.Fragment>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
             style={{marginBottom: 20}}
        >
          <h1 style={{marginTop: 0, marginBottom: 0}}>MovieDB</h1>
          <MovieDialog onSave={addMovie}/>
        </Box>

        <Box sx={{display: 'flex'}} style={{marginBottom: 20}}>
          <MovieListFilter
            movies={movies}
            onSearchTermChanged={setSearchTerm}
          />
        </Box>
        <Box>
          {filteredMoviesOrWarning}
        </Box>
      </React.Fragment>
    );
  }
}
