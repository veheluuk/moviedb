import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import moviesReducer from 'store/movies/movies.slice';
import { moviesEffects } from 'store/movies/movies.effects';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(moviesEffects.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
