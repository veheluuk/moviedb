import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Rating } from '@mui/material';

import { MovieInterface } from 'interfaces';
import { NavigateBack } from 'components/navigate-back.component';
import { moviesStore, useAppSelector } from 'store';

export function MovieDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState(0);
  const movies = useAppSelector(moviesStore.selectors.movies);
  const [movie, setMovie] = useState<MovieInterface|undefined>();
  
  useEffect(() => {
    setId(Number(params.id) ?? 0);  
  }, [params]);

  useEffect(() => {
    setMovie(movies.find(movie => movie.id === id))
  }, [id, movies])
  
  const edit = () => {
    navigate('edit');  
  }

  console.log(id);
  
  const columnStyle ={ display: 'flex', flexDirection: 'column', gap: 1};
  const rowStyle = { display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 3};
  
  return (
    <React.Fragment>
      <Box style={{marginBottom: 20}} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <NavigateBack />
        
        {/*<IconButton*/}
        {/*  color="primary"*/}
        {/*  onClick={edit}*/}
        {/*>*/}
        {/*  <Edit />*/}
        {/*</IconButton>*/}
      </Box>
      { movie ? 
      <Box sx={columnStyle}>
        <Box sx={rowStyle}>
          <strong>Name</strong>
          <span>{movie.name}</span>
        </Box>
        <Box sx={rowStyle}>
          <strong>Year</strong>
          <span>{movie.year}</span>
        </Box>
        <Box sx={rowStyle}>
          <strong>Genres</strong>
          <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
        </Box>
        <Box sx={rowStyle}>
          <strong>Synopsis</strong>
          <span>{movie.synopsis}</span>
        </Box>
        <Box sx={rowStyle}>
          <strong>Director</strong>
          <span>{movie.director?.firstname} {movie.director?.lastname}</span>
        </Box>
        <Box sx={rowStyle}>
          <strong>Actors</strong>
          {movie.actors?.map((actor) => `${actor.firstname} ${actor.lastname}`).join(', ')}
        </Box>
        <Box sx={rowStyle}>
          <strong>Rating</strong>
          <Rating size='small' value={movie.rating} readOnly />
        </Box>
        <Box sx={rowStyle}>
          <strong>Age limit</strong>
          <span>{movie.ageLimit}</span>
        </Box>
      </Box> : null
      }
    </React.Fragment>
  );
}