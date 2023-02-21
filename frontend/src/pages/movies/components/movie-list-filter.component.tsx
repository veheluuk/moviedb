import React, { useEffect, useRef, useState } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Clear } from '@mui/icons-material';

import MovieInterface from 'interfaces/movie.interface';

interface MovieListProps {
  movies: MovieInterface[];
  onSearchTermChanged: (searchTerm: string) => void;
}

export default function MovieListFilter(props: MovieListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchTermInputElement = useRef<HTMLInputElement>(null);
  
  const onSearchTermChanged = props.onSearchTermChanged;
  
  useEffect(() => {
    onSearchTermChanged(searchTerm);
  }, [searchTerm]);

  const clearSearchTerm = () => {
    if (searchTermInputElement.current) {
      searchTermInputElement.current.value = '';
    }
    setSearchTerm('');
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
        id="searchTerm"
        inputRef={searchTermInputElement}
        type="text"
        label="Search"
        endAdornment={clearIcon}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </FormControl>
  );
}
