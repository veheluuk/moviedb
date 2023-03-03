import { createAsyncThunk } from '@reduxjs/toolkit';

import { constants } from 'config/constants';
import { MovieInterface } from 'interfaces';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
}

const fetchAll = createAsyncThunk(
  'movies/fetchMovies',
  async (): Promise<Array<MovieInterface>> => {
  return await fetch(`${constants.apiUrl}/Movies`)
    .then(response => response.json());
});

const postMovie = createAsyncThunk(
  'movies/addMovie', 
  async (movie: MovieInterface, thunkAPI): Promise<MovieInterface> => {
    const options = { method: 'POST', headers, body: JSON.stringify(movie) };
  
    return await fetch(`${constants.apiUrl}/Movies`, options)
      .then(response => response.ok ? response.json() : thunkAPI.rejectWithValue(response));
  }
);

const updateMovie = createAsyncThunk('movies/updateMovie', async (movie: MovieInterface, thunkAPI): Promise<MovieInterface> => {
  const options = { method: 'PUT', headers, body: JSON.stringify(movie) };
  
  return await fetch(`${constants.apiUrl}/Movies`, options)
    .then(response => response.ok ? response.json() : thunkAPI.rejectWithValue(response));
});

const deleteMovie = createAsyncThunk('movies/updateMovie', async (id: number, thunkAPI) => {
  const options = { method: 'DELETE', headers };

  return await fetch(`${constants.apiUrl}/Movies/${id}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        thunkAPI.rejectWithValue(response);
      }
    });
});

export const moviesApi = {
  fetchAll,
  postMovie,
  updateMovie,
  deleteMovie,
}
