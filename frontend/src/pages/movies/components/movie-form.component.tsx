import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import {
  Autocomplete,
  TextField,
} from '@mui/material';

import { ActorInterface, MovieInterface } from 'interfaces';
import { useAppSelector } from 'store';
import { moviesStore } from 'store/movies';

export interface MovieFormProps extends React.ComponentProps<any> {
  movie?: MovieInterface;
  onChanged?: (movie: MovieInterface) => void;
}

const yearOptions = Array.from({ length: (new Date().getFullYear() + 5) - 1895 }, (value, key) => 1895 + key).reverse();
const ageLimits = Array.from({ length: 21 }, (value, key) => key + 1).reverse(); // 1-21

export function MovieForm(props: MovieFormProps) {
  const actorOptions = useAppSelector(moviesStore.selectors.actorOptions);
  const directorOptions = useAppSelector(moviesStore.selectors.directorOptions);
  const genres = useAppSelector(moviesStore.selectors.genresSorted);

  const [movie, setMovie] = useState<MovieInterface>(props.movie ?? {
    name: '',
    year: null,
    rating: null,
    genres: [],
    actors: [],
    director: { firstname: "", lastname: "" },
    synopsis: '',
    ageLimit: null,
  });
    
  useEffect(() => {
    if (props.onChanged) {
      props.onChanged(movie);
    }
  }, [props, movie]);

  const onNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMovie({ ...movie, name: event.target.value });
  }

  const onYearChange = (event: any) => {
    console.log(event);
    setMovie({ ...movie, year: Number(event.target.value) });
  }

  const onSynopsisChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMovie({ ...movie, synopsis: event.target.value })
  }
  
  const onAgeLimitChange = (event: any) => {
    setMovie({ ...movie, ageLimit: event.target.value })
  }
  
  const onGenreChange = (event: React.SyntheticEvent, value: Array<string>) => {
    setMovie({ ...movie, genres: value.map((v: string) => ({ name: v })) })
  }

  const onActorsChange = (event: React.SyntheticEvent, value: Array<ActorInterface>) => {
    setMovie({ ...movie, actors: value.map((actor) => ({ firstname: actor.firstname, lastname: actor.lastname })) })
  }

  const onDirectorChange = (event: SyntheticEvent<Element, Event>, value: any) => {
    setMovie({ ...movie, director: { firstname: value.firstname, lastname: value.lastname } });
  }

  return (
    <React.Fragment>
      <TextField
        autoFocus
        id="name"
        label="Name"
        type="text"
        variant="outlined"
        margin="dense"
        fullWidth
        required
        value={movie.name}
        style={{ marginBottom: 10 }}
        onChange={onNameChange}
        disabled={props.disabled}
      />

      <Autocomplete
        id="year"
        fullWidth
        style={{ marginBottom: 10 }}
        options={yearOptions}
        getOptionLabel={(option) => option.toString()}
        renderInput={(params) => <TextField {...params} label="Year"/>}
        onChange={onYearChange}
        disabled={props.disabled}
      />

      <TextField
        id="synopsis"
        label="Synopsis"
        type="text"
        variant="outlined"
        fullWidth
        multiline
        style={{ marginBottom: 10 }}
        value={movie.synopsis}
        onChange={onSynopsisChange}
        disabled={props.disabled}
      />

      <Autocomplete
        id="ageLimit"
        fullWidth
        options={ageLimits}
        getOptionLabel={(option) => option.toString()}
        style={{ marginBottom: 10 }}
        renderInput={(params) => <TextField {...params} label="Age limit"/>}
        onChange={onAgeLimitChange}
        disabled={props.disabled}
      />

      <Autocomplete
        id="genres"
        multiple
        options={genres}
        getOptionLabel={(option: string) => option}
        style={{ marginBottom: 10 }}
        renderInput={(params) => (
          <TextField
            {...params}
            multiline
            variant="outlined"
            label="Genres"
            placeholder="Add genres"
          />
        )}
        onChange={onGenreChange}
        disabled={props.disabled}
      />

      <Autocomplete
        id="actors"
        multiple
        options={actorOptions}
        fullWidth
        style={{ marginBottom: 10 }}
        renderInput={(params) => (
          <TextField
            {...params}
            multiline
            variant="outlined"
            label="Actors"
            placeholder="Add actors"
          />
        )}
        onChange={onActorsChange}
        disabled={props.disabled}
      />

      <Autocomplete
        id="director"
        fullWidth
        options={directorOptions}
        renderInput={(params) => <TextField {...params} label="Director"/>}
        onChange={onDirectorChange}
        disabled={props.disabled}
      />
    </React.Fragment>
  );
}
