import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Rating,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MovieInterface from 'interfaces/movie.interface';

export default function MovieList(props: { movies: MovieInterface[] }) {
  const movieItems = props.movies.map((movie: MovieInterface) => {
    const actorNames = movie.actors?.map((actor) => `${actor.firstname} ${actor.lastname}`) ?? [];

    const movieActors = actorNames.length > 0 ? actorNames.join(', ') : '';

    return (
      <Accordion key={movie.id} disableGutters={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id={`movie-accordion-${movie.id}`}
        >
          <Typography variant="body1" style={{marginRight: 5}}><strong>{movie.name}</strong></Typography>
          <Typography variant="body1" style={{marginRight: 10}}><strong> ({movie.year})</strong></Typography>
          <Rating style={{marginRight: 10, opacity: 0.5}} value={movie.rating} size="small" readOnly></Rating>
        </AccordionSummary>
        <AccordionDetails style={{paddingTop: 0}}>
          <Typography variant="subtitle1"><strong>Synopsis</strong></Typography>
          <Typography variant="body1" style={{marginBottom: 10}}>
            {movie.synopsis}
          </Typography>
          <Typography variant="subtitle1"><strong>Actors</strong></Typography>
          <Typography variant="body1" style={{marginBottom: 10}}>
            {movieActors}
          </Typography>
          <Typography variant="subtitle1"><strong>Director</strong></Typography>
          <Typography variant="body1" style={{marginBottom: 10}}>
            {movie.director?.firstname} {movie.director?.lastname}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <React.Fragment>
      {movieItems}
    </React.Fragment>
  );
}
