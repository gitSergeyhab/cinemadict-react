import { createSelector } from 'reselect';
import { FilmFilter, SortType } from '../../const';
import { Film } from '../../types/types';
import { getMostCommentedFilms, getTopFilms } from '../../utils/utils';
import { ReducerName, State } from '../root-reducer';

const field = ReducerName.Film;

export const getMovies = (state: State): Film[] => state[field].films;
export const getMoviesLoadedStatus = (state: State): boolean => state[field].areFilmsLoaded;
export const getFilter = (state: State): FilmFilter => state[field].filter;
export const getSortType = (state: State): SortType => state[field].sortType;
export const getMainMovies = (state: State): Film[] => state[field].mainFilms;
export const getShownMovieCount = (state: State): number => state[field].shownFilms;


export const getTopRatedMovies = createSelector([getMovies], (films: Film[]) => getTopFilms(films));
export const getMostCommentedMovies = createSelector([getMovies], (films: Film[]) => getMostCommentedFilms(films));

// export const getSortedFilteredMovies = createSelector([getMovies], (films: Film[]) => getSortedFilteredFilms(films)))

