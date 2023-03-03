import { createSelector } from '@reduxjs/toolkit';

import { ActorInterface, MovieInterface, DirectorInterface } from 'interfaces';
import { RootState } from 'store';

const movies = (state: RootState) => state.movies.movies;
const searchTerm = (state: RootState) => state.movies.searchTerm;

const sortedMovies = createSelector(
  movies,
  (movies) => movies.slice().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
);

const filteredMovies = createSelector(
  searchTerm,
  sortedMovies,
  (searchTerm, movies) => movies.slice().filter(((movie) =>
    movie.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
    movie.synopsis.toUpperCase().includes(searchTerm.toUpperCase())))
);

const actors = createSelector(
  movies,
  (movies: Array<MovieInterface>) => {
    const actors = new Array<ActorInterface>;

    movies.forEach(movie => movie.actors.forEach(actor => {
      if (!actors.find((a) => a.firstname === actor.firstname && a.lastname === actor.lastname)) {
        actors.push(actor);
      }
    }));

    return actors;
  }
);

const actorsSorted = createSelector(
  actors,
  (actors) => actors.sort((a, b) => a.lastname.toLowerCase().localeCompare(a.lastname.toLowerCase()) ?? a.firstname.toLowerCase().localeCompare(b.firstname.toLowerCase()))
);

// For select boxes
const actorOptions = createSelector(
  actorsSorted,
  (actors) => actors.map(actor => ({ ...actor, label: `${actor.firstname} ${actor.lastname}` }))
);

const directors = createSelector(
  movies,
  (movies) => {
    const directors = new Array<DirectorInterface>;

    movies.forEach(movie => {
      if (movie.director && !directors.find((d) => d.firstname === movie.director!.firstname && d.lastname === movie.director!.lastname)) {
        directors.push(movie.director);
      }
    })

    return directors;
  }
);

const directorOptions = createSelector(
  directors,
  (directors) => directors.map(director => ({
    firstname: director.firstname,
    lastname: director.lastname,
    label: `${director.firstname} ${director.lastname}`,
  }))
);

const genres = createSelector(
  movies,
  (movies: Array<MovieInterface>) => {
    const set = new Set<string>();
    movies.forEach(movie => movie.genres.forEach(genre => set.add(genre.name)));
    return Array.from(set);
  }
)

const genresSorted = createSelector(
  genres,
  (genres) => genres.sort((a, b) => a.localeCompare(b))
)
const isLoading = (state: RootState) => state.movies.isLoading;
const error = (state: RootState) => state.movies.error;

export const moviesSelectors = {
  actors,
  actorsSorted,
  actorOptions,
  genres,
  genresSorted,
  movies,
  sortedMovies,
  filteredMovies,
  directors,
  directorOptions,
  searchTerm,
  isLoading,
  error,
}
