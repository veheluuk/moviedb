import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Backdrop,
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { MovieInterface } from 'interfaces';
import { MovieForm } from 'pages/movies/components/movie-form.component';
import { store, useAppSelector, moviesApi, moviesStore } from 'store';

export interface MovieDialogProps {
  isOpen: boolean;
}

export default function MovieAddDialog(props: MovieDialogProps) {
  const navigate = useNavigate();
  
  const isLoading = useAppSelector(moviesStore.selectors.isLoading);
  const [movie, setMovie] = useState<MovieInterface>({
    name: '',
    year: 0,
    rating: 0,
    genres: [],
    actors: [],
    director: null,
    synopsis: '',
    ageLimit: null,
  });

  const handleClose = (event: any, reason: string) => {
    if (reason !== 'backdropClick') {
      navigate(-1);
    }
  }
  
  const handleCancel = () => {
    navigate(-1);
  }
  
  const handleSave = () => {
    store.dispatch(moviesApi.postMovie(movie));
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        style={{padding: 20}}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} style={{padding: 20}}>
          <span>Add new movie</span>
          
          <Link to="/">
            <IconButton
              aria-label="close"
              onClick={handleCancel}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </Link>
        </DialogTitle>
        <DialogContent>
          <MovieForm movie={movie} onChanged={setMovie} disabled={isLoading}></MovieForm>
        </DialogContent>
        <DialogActions style={{padding: 20}}>
          { isLoading ? <CircularProgress size={20} style={{marginLeft: 10}} /> : null }
          <Link to="/" style={{marginRight: 20}}>
            <Button size="large" variant="outlined" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
          </Link>
          <Button size="large" variant="contained" onClick={handleSave} disabled={isLoading}>Save</Button>
        </DialogActions>
      </Dialog>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000000 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
