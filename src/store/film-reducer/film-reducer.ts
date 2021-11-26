import { createReducer } from '@reduxjs/toolkit';
import { FilmFilter, FILM_PORTION, SortType } from '../../const';
import { Film } from '../../types/types';
import { getSortedFilteredFilms } from '../../utils/utils';
import { loadFilms, setFilmError, setFilter, setShownFilmCount, setSortType, sortFilterFilms } from '../actions';


type FilmState ={
  films: Film[],
  mainFilms: Film[],
  areFilmsLoaded: boolean,
  filter: FilmFilter,
  sortType: SortType,
  shownFilms: number,
  loadingError: boolean
}

const initialState: FilmState = {
  films: [],
  mainFilms: [],
  areFilmsLoaded: false,
  filter: FilmFilter.AllMovies,
  sortType: SortType.Default,
  shownFilms: FILM_PORTION,
  loadingError: false,

};

export const filmReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.areFilmsLoaded = true;
    })
    .addCase(setFilter, (state, action) => {state.filter = action.payload;})
    .addCase(setSortType, (state, action) => {state.sortType = action.payload;})
    .addCase(sortFilterFilms, (state) => {
      state.mainFilms = getSortedFilteredFilms(state.films, state.filter, state.sortType);
    })
    .addCase(setShownFilmCount, (state, action) => {state.shownFilms = action.payload;})
    .addCase(setFilmError, (state, action) => {state.loadingError = action.payload;});
});
