import { Film } from '../../types/types';
import { ReducerName, State } from '../root-reducer';
import { FilmFilter, SortType } from '../../const';


const field = ReducerName.Catalog;

export const getFilter = (state: State): FilmFilter => state[field].filter;
export const getSortType = (state: State): SortType => state[field].sortType;
export const getMainMovies = (state: State): Film[] => state[field].mainFilms;
export const getShownMovieCount = (state: State): number => state[field].shownFilms;
export const getPopupId = (state: State): string | null => state[field].popupId;

