import { createReducer } from '@reduxjs/toolkit';
import { FilmFilter, FILM_PORTION, SortType } from '../../const';
import { Film } from '../../types/types';
import { getSortedFilteredFilms } from '../../utils/utils';
import { loadFilms, setFilter, setShownFilmCount, setSortType, sortFilterFilms } from '../actions';


type FilmState ={
  films: Film[],
  mainFilms: Film[],
  areFilmsLoaded: boolean,
  filter: FilmFilter,
  sortType: SortType,
  shownFilms: number,
}

const initialState: FilmState = {
  films: [],
  mainFilms: [],
  areFilmsLoaded: false,
  filter: FilmFilter.AllMovies,
  sortType: SortType.Default,
  shownFilms: FILM_PORTION,
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
    .addCase(setShownFilmCount, (state, action) => {state.shownFilms = action.payload;});
});


// export const enum AgeRating {
//   Zero = '0+',
//   Six = '6+',
//   Twelve = '12+',
//   Sixteen = '16+',
//   Eighteen = '18+',
//   No = '',
// }

// export const enum Emotion {
//   Smile = 'smile',
//   Sleeping = 'sleeping',
//   Puke = 'puke',
//   Angry = 'angry'
// }

// export type Comment = {
//   id: number,
//   author: string,
//   comment: string,
//   date: string,
//   emotion: Emotion,
// };


// export type Film = {
//   id: number,
//   comments: Comment[],
//   filmInfo: {
//     title: string,
//     alternativeTitle: string,
//     totalRating: number,
//     poster: string,
//     ageRating: AgeRating,
//     director: string,
//     writers: string[],
//     actors: string[],
//     release: {
//       date: string,
//       releaseCountry: string,
//     },
//     runtime: number,
//     genre: string,
//     description:string,
//   },
//   userDetails: {
//     watchList: boolean,
//     alreadyWatched: boolean,
//     watchingDate: string
//     favorite: boolean,
//   },
// };


// const state = {
//   films: [],
//   areFilmsLoaded: false,
// }

