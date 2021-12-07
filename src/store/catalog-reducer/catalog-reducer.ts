import { createSlice } from '@reduxjs/toolkit';

import { Film } from '../../types/types';
import { getSortedFilteredFilms } from '../../utils/utils';
// import { loadFilms, setFilmError, setFilter, setShownFilmCount, setSortType, sortFilterFilms } from '../actions';
import { FilmFilter, FILM_PORTION, SortType } from '../../const';


type FilmState ={
  films: Film[],
  mainFilms: Film[],
  areFilmsLoaded: boolean,
  filter: FilmFilter,
  sortType: SortType,
  shownFilms: number,
  loadingError: boolean,
  popupId: string | null,
}

const initialState: FilmState = {
  films: [],
  mainFilms: [],
  areFilmsLoaded: false,
  filter: FilmFilter.AllMovies,
  sortType: SortType.Default,
  shownFilms: FILM_PORTION,
  loadingError: false,
  popupId: null,
};

export const catalogReducer = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setMainFilms(state, action) {state.mainFilms = getSortedFilteredFilms(action.payload, state.filter, state.sortType);},
    setFilter(state, action) {state.filter = action.payload;},
    setSortType(state, action) {state.sortType = action.payload;},
    setShownMovieCount(state, action) {state.shownFilms = action.payload;},
    setPopup(state, action) {state.popupId = action.payload;},

  },
});

export const {setMainFilms, setFilter, setShownMovieCount, setSortType, setPopup} = catalogReducer.actions;
