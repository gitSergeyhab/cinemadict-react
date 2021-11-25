import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


import { rootReducer } from './store/root-reducer';
import { createAPI } from './services/api';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { fetchFilmAction } from './store/api-actions';
import { setFilter } from './store/actions';
import { AppRoute, FilmFilter } from './const';


const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});

store.dispatch(fetchFilmAction());

store.dispatch(setFilter(window.location.pathname === AppRoute.Stats ? FilmFilter.Stats : FilmFilter.AllMovies));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'));
