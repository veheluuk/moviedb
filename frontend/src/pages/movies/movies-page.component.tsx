import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import MovieListFilter from 'pages/movies/components/movie-list-filter.component';
import { MovieList } from 'pages/movies/components/movie-list.component';
import { moviesApi, moviesStore, store, useAppSelector } from 'store';

export default function MoviesPage() {
  const error = useAppSelector(moviesStore.selectors.error);

  useEffect(() => {
    store.dispatch(moviesApi.fetchAll());
  }, []);

  useEffect(() => {
    console.log(`Error`, error);
  }, [error])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <MovieListFilter />
        <MovieList />
        <Outlet/>
      </Box>
    </React.Fragment>
  );
}
