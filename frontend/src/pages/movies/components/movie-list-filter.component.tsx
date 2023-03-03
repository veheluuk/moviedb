import React, { useRef } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';

import { clearMoviesSearch, moviesStore, searchMovies, store, useAppSelector } from 'store';

export default function MovieListFilter() {
  const searchTerm = useAppSelector(moviesStore.selectors.searchTerm);
  const searchTermInputElement = useRef<HTMLInputElement>(null);
  
  const clearSearchTerm = () => {
    if (searchTermInputElement.current) {
      searchTermInputElement.current.value = '';
    }
    store.dispatch(clearMoviesSearch());
  }

  const clearIcon = searchTerm.length > 0
    ? <InputAdornment position="end">
        <IconButton
          aria-label="Clear search term"
          edge="end"
          onClick={clearSearchTerm}
        >
          <Clear/>
        </IconButton>
      </InputAdornment>
    : undefined;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="searchTerm">Search</InputLabel>
      <OutlinedInput
        autoFocus
        id="searchTerm"
        inputRef={searchTermInputElement}
        type="text"
        label="Search"
        startAdornment={<Search style={{marginRight: 10}}/>}
        endAdornment={clearIcon}
        defaultValue={searchTerm}
        onChange={(event) => store.dispatch(searchMovies(event.target.value))}
      />
    </FormControl>
  );
}
