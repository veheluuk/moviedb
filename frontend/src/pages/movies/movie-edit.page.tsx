import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import { MovieInterface } from 'interfaces';
import { MovieForm } from 'pages/movies/components/movie-form.component';
import { moviesApi, moviesStore, useAppDispatch, useAppSelector } from 'store';

export function MovieEditPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState(0);
  const movies = useAppSelector(moviesStore.selectors.movies);
  const [movie, setMovie] = useState<MovieInterface|undefined>();

  useEffect(() => {
    setMovie(movies.find(movie => movie.id === id))
  }, [id, movies])
  
  useEffect(() => {
    setId(Number(params.id) ?? 0);
  }, [params]);

  const handleCancel = () => {
    navigate(-1);
  }
  
  const handleSave = () => {
    if (movie) {
      dispatch(moviesApi.updateMovie(movie));
    }
  }
  
  return (
    <React.Fragment>
      <h2>Edit movie</h2>
      <MovieForm movie={movie} onChanged={setMovie}></MovieForm>
      <MovieEditFormActions style={{marginTop: 20}} onCancel={handleCancel} onSave={handleSave} />
    </React.Fragment>
  );
}

export interface MovieEditFormActionsProps extends React.ComponentProps<any> {
  onCancel: () => void;
  onSave: () => void;
}

function MovieEditFormActions(props: MovieEditFormActionsProps) {
  return (
    <Box style={props.style} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'start' }}>
      <Box>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={props.onSave} variant="contained">Save</Button>
      </Box>
    </Box>
  )
}
