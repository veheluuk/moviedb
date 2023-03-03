import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MovieInterface } from 'interfaces';
import { moviesApi } from 'store/movies/movies-api';

const name = 'movies';

export interface MoviesState {
  movies: Array<MovieInterface>;
  searchTerm: string;
  isLoading: boolean;
  error?: string|null;
}

const initialState: MoviesState = {
  movies: [],
  searchTerm: '',
  isLoading: false,
  error: null,
}

export const moviesSlice = createSlice({
  name,
  initialState,
  reducers: {
    searchMovies: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearMoviesSearch: (state) => {
      state.searchTerm = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(moviesApi.fetchAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moviesApi.fetchAll.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(moviesApi.fetchAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(moviesApi.postMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moviesApi.postMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.movies = [...state.movies, action.payload];
      })
      .addCase(moviesApi.postMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(moviesApi.deleteMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moviesApi.deleteMovie.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = null;
        state.movies = state.movies.filter((movie) => movie.id !== Number(action.payload))
      })
      .addCase(moviesApi.deleteMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
})

export const {
  searchMovies,
  clearMoviesSearch,
} = moviesSlice.actions;

export default moviesSlice.reducer
