import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Link, Navigate, RouterProvider } from 'react-router-dom';

import 'index.css';
import { App } from 'App';
import { ErrorSnackbar } from 'components/error-snackbar.component';
import { store } from 'store/store';
import MoviesPage from 'pages/movies/movies-page.component';
import MovieAddDialog from 'pages/movies/components/movie-add-dialog.component';
import { MovieDetails } from 'pages/movies/movie-details.page';
import { MovieEditPage } from 'pages/movies/movie-edit.page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error, <Link to="/">go back to home</Link></div>,
    children: [
      {
        path: '/',
        element: <Navigate to="/movies" />
      },
      {
        path: '/movies',
        element: <MoviesPage />,
        children: [
          {
            path: 'add',
            element: <MovieAddDialog isOpen={true} />,
          }
        ]
      },
      {
        path: '/movies/:id',
        element: <MovieDetails />,
      },
      {
        path: '/movies/:id/edit',
        element: <MovieEditPage />,
      }
    ]
  },
]);

// React.StrictMode causes app to render twice so it's disabled atm. for development convinience
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ErrorSnackbar />
    </Provider>
  // </React.StrictMode>
);

