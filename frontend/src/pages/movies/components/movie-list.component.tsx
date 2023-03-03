import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from '@mui/material';
import { Delete, Edit, InfoOutlined, MoreVert } from '@mui/icons-material';

import { MovieInterface } from 'interfaces';
import { moviesApi, moviesStore, useAppDispatch, useAppSelector } from 'store';

export function MovieList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [movieId, setMovieId] = useState<number | null>(null);
  const isLoading = useAppSelector(moviesStore.selectors.isLoading);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setMovieId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInfo = () => {
    navigate(`${movieId}`);
  }

  const handleEdit = () => {
    navigate(`${movieId}/edit`);
  }

  const handleDelete = () => {
    if (movieId) {
      dispatch(moviesApi.deleteMovie(movieId));
    }
  }

  return isLoading
    ? <CircularProgress />
    : <React.Fragment>
        <MovieListItems openItemMenu={handleClick} />
        <MovieListItemDropDownMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onInfo={handleInfo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </React.Fragment>
}

const MovieListItems = (props: { openItemMenu: (event: React.MouseEvent<HTMLElement>, id: number) => void }) => {
  const movies = useAppSelector(moviesStore.selectors.filteredMovies);
  const searchTerm = useAppSelector(moviesStore.selectors.searchTerm);
  
  return (
    <React.Fragment>
      {movies.length === 0
        ? <span>None of the movies match search term <em>{`"${searchTerm}"`}</em></span>
        : <List>
          {movies.map((movie: MovieInterface) =>
            <ListItem key={movie.id!}>
              <Box style={{ width: '100%' }}
                   sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to={`/movies/${movie.id}`} color="inherit" style={{ textDecoration: 'none' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ListItemText
                      primary={movie.name}
                      secondary={movie.year}
                      style={{ marginRight: 40 }}
                    />
                    {/*<Rating style={{ opacity: 0.5 }} value={movie.rating} size="small" readOnly></Rating>*/}
                  </Box>
                </Link>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <IconButton onClick={(event) => props.openItemMenu(event, movie.id!)}>
                    <MoreVert/>
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          )}
        </List>
      }
    </React.Fragment>
  );
}

const MovieListItemDropDownMenu = (props: MovieDropDownMenuProps) => {
  const { onEdit, onDelete, onInfo, ...rest } = props;

  return (
    <Menu anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          {...rest}
    >
      <MenuItem onClick={onInfo}>
        <InfoOutlined style={{ marginRight: 10 }}/>
        Details
      </MenuItem>
      <MenuItem onClick={onEdit}>
        <Edit style={{ marginRight: 10 }}/>
        Edit
      </MenuItem>
      <Divider/>
      <MenuItem onClick={onDelete}>
        <Delete style={{ marginRight: 10 }}/>
        Delete
      </MenuItem>
    </Menu>
  )
};

interface MovieDropDownMenuProps extends MenuProps {
  onEdit: (event: React.MouseEvent<HTMLElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
  onInfo: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
}
