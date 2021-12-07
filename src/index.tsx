import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { AppRoute, FilmFilter } from './const';
import { queryApi } from './services/query-api';
import { setFilter } from './store/catalog-reducer/catalog-reducer';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(queryApi.middleware),
});

store.dispatch(setFilter(window.location.pathname === AppRoute.Stats ? FilmFilter.Stats : FilmFilter.AllMovies)); // для индикации нужного фильтра при первоначальной загрузе

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'));
