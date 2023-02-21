import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Rating, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import MovieInterface from 'interfaces/movie.interface';

export interface MovieDialogProps {
  onSave: (movie: MovieInterface) => void
}

export default function MovieDialog(props: MovieDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [movie, setMovie] = React.useState<MovieInterface>({
    name: '',
    year: null,
    rating: null,
    genres: [],
    actors: [],
    director: {firstname: "", lastname: ""},
    synopsis: '',
    ageLimit: null,
  });
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const appendActor = () => {
    const actors = movie.actors?.length
      ? [...movie.actors, { firstname: '', lastname: '' }]
      : [{ firstname: '', lastname: '' }];
    
    setMovie({ ...movie, actors });
  };
  
  const removeActor = (index: number) => {
    if (movie.actors?.length) {
      const actors = [...movie.actors];
      actors.splice(index, 1);
      
      setMovie({...movie, actors });
    }
  };
  
  const handleActorFirstnameChanged = (event: any, index: number) => {
    let actors = [...movie.actors!];
    actors[index].firstname = event.target.value;
    setMovie({ ...movie, actors });
  };

  const handleActorLastnameChanged = (event: any, index: number) => {
    let actors = [...movie.actors!];
    actors[index].lastname = event.target.value;
    setMovie({ ...movie, actors });
  };
  
  const actorsListOrNotify = movie.actors?.length
    ? movie.actors?.map((actor, index) => (
      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            margin="dense"
            id={`firstname-${index}`}
            label="Actor's firstname"
            type="text"
            fullWidth
            variant="outlined"
            style={{marginRight: 10}}
            value={actor.firstname}
            onChange={(event) => handleActorFirstnameChanged(event, index) }
          />
      
          <TextField
            margin="dense"
            id={`lastname-${index}`}
            label="Actor's lastname"
            type="text"
            fullWidth
            variant="outlined"
            style={{marginRight: 10}}
            value={actor.lastname}
            onChange={(event) => handleActorLastnameChanged(event, index)}
          />
  
          <IconButton edge="end" aria-label="delete" onClick={() => removeActor(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </React.Fragment>))
    : (<Typography variant="body2"><em>Movie has no actors yet...</em></Typography>);
  
  return (
    <React.Fragment>
      <IconButton color="primary"
                  aria-label="Add movie"
                  onClick={handleClickOpen}>
        <Add />
      </IconButton>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Lisää elokuva tietokantaan</DialogTitle>
        <DialogContent>
          <Typography variant="h6" style={{marginBottom: 10}}>Basic Information</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={movie.name}
            onChange={(event) => setMovie({ ...movie, name: event.target.value})}
          />
          <TextField
            margin="dense"
            id="name"
            label="Year"
            type="number"
            fullWidth
            variant="outlined"
            value={movie.year}
            onChange={(event) => setMovie({ ...movie, year: Number(event.target.value) })}
          />
          <TextField
            margin="dense"
            id="name"
            label="Synopsis"
            type="text"
            fullWidth
            variant="outlined"
            value={movie.synopsis}
            onChange={(event) => setMovie({ ...movie, synopsis: event.target.value })}
          />
          <TextField
            margin="dense"
            id="name"
            label="Age limit"
            type="number"
            fullWidth
            variant="outlined"
            value={movie.ageLimit}
            onChange={(event) => setMovie({ ...movie, ageLimit: Number(event.target.value) ?? null })}
          />
          
          <Typography variant="h6" style={{marginTop: 10, marginBottom: 10}}>Rating</Typography>
          <Rating
            value={movie.rating}
            onChange={(event, newValue) => setMovie({ ...movie, rating: newValue })}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" style={{marginTop: 10, marginBottom: 10}}>Genres</Typography>
            <IconButton edge="end" aria-label="delete" disabled>
              <Add />
            </IconButton>
          </Box>
          <TextField
            margin="dense"
            label="Genres comma separated"
            type="text"
            fullWidth
            variant="outlined"
            disabled
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" style={{marginTop: 10, marginBottom: 10}}>Actors</Typography>
            
            <IconButton  edge="end" aria-label="Append actor" onClick={() => appendActor() }>
              <Add />
            </IconButton>
          </Box>
          
          {actorsListOrNotify}
          
          <Typography variant="h6" style={{marginTop: 10, marginBottom: 10}}>Director</Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              margin="dense"
              label="Director's firstname"
              type="text"
              fullWidth
              variant="outlined"
              style={{marginRight: 10}}
              value={movie.director?.firstname}
              onChange={(event) => setMovie({ ...movie, director: { firstname: event.target.value, lastname: movie.director?.lastname ?? '' } })}
            />
            <TextField
              margin="dense"
              label="Director's lastname"
              type="text"
              fullWidth
              variant="outlined"
              value={movie.director?.lastname}
              onChange={(event) => setMovie({ ...movie, director: { firstname: movie.director?.firstname ?? '', lastname: event.target.value } })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => props.onSave(movie)}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
