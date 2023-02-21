import React from 'react';
import { Container, Paper } from '@mui/material';

import 'App.css';
import MoviesPage from 'pages/movies/movies-page.component';

export default function App() {
  return (
    <Container maxWidth="md">
      <Paper elevation={1} style={{padding: 20, margin: 10}}>
        <MoviesPage />
      </Paper>
    </Container>
  );
}
