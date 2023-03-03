import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, Container, Divider, Menu, MenuItem, MenuProps, Paper } from '@mui/material';
import { ArrowDropDown, Delete, InfoOutlined } from '@mui/icons-material';

import 'App.css';
import { MovieInterface } from 'interfaces';
import { moviesApi, moviesStore, useAppDispatch, useAppSelector } from 'store';
import { moviesData } from 'data/movies-compact';

export function App() {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Paper elevation={2} style={{ padding: 20, margin: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
               style={{ marginBottom: 20 }}
          >
            <Link to="/" color="inherit" style={{ textDecoration: 'none' }}>
              <h1 style={{ marginTop: 0, marginBottom: 0 }}>MovieDB</h1>
            </Link>

            <ButtonGroup variant="contained">
              <AddNewMovieButton href="movies/add"/>
              <DevelopmentActionsButton/>
            </ButtonGroup>
          </Box>
          <Box>
            <Outlet/>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

function AddNewMovieButton(props: { href: string }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.href);
  }

  return (
    <Button
      onClick={handleClick}
      color="primary"
      variant="contained"
      aria-label="Add movie"
    >
      New movie
    </Button>
  );
}

function DevelopmentActionsButton() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <React.Fragment>
      <Button
        size="small"
        color="primary"
        variant="contained"
        aria-label="Development actions"
        onClick={openMenu}
      >
        <ArrowDropDown/>
      </Button>
      <DevelopmentActionsMenu open={menuOpen} onClose={closeMenu} anchorEl={anchorEl}/>
    </React.Fragment>
  );
}

function DevelopmentActionsMenu(props: MenuProps) {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(moviesStore.selectors.movies);
  
  const handlePopulateDatabase = () => {
    moviesData.forEach((movie, index) => {
      setTimeout((movie: MovieInterface) => dispatch(moviesApi.postMovie(movie)), 250 * index, movie);
    })
  }

  const handleWipeDatabase = () => {
    movies.forEach((movie) => {
      if (movie.id) {
        dispatch(moviesApi.deleteMovie(movie.id));
      }
    });
  }

  return (
    <Menu {...props}
          onClose={props.onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={handlePopulateDatabase}>
        <InfoOutlined style={{ marginRight: 10 }}/>
        Populate
      </MenuItem>
      <Divider/>
      <MenuItem onClick={handleWipeDatabase}>
        <Delete style={{ marginRight: 10 }}/>
        Wipe database
      </MenuItem>
    </Menu>
  )
};
