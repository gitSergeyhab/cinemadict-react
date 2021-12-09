import dayjs from 'dayjs';
import { Film, ServerFilm } from '../types/types';
import { BtnType, FilmFilter, Rating, SortType } from '../const';
import { adaptToServer } from '../services/adapters';


const ADDITIONAL_BLOCK_LENGTH = 2;
const MAX_DESCRIPTION_LENGTH = 140;

const minDate = dayjs('0000-00-00');


const sortAndCut = (list: Film[], sortFunction: (a: Film, b: Film) => number , length = ADDITIONAL_BLOCK_LENGTH) : Film[] => list.slice().sort(sortFunction).slice(0, length);

const getTopFilms = (films: Film[]): Film[] => sortAndCut(films, (a, b) => (b.filmInfo.totalRating || 0) - (a.filmInfo.totalRating || 0));
const getMostCommentedFilms = (films: Film[]): Film[] => sortAndCut(films, (a, b) => b.comments.length - a.comments.length);

const sortDate = (a: Film, b: Film): number => dayjs(b.filmInfo.release.date || minDate).diff(dayjs(a.filmInfo.release.date || minDate));
const sortRating = (a: Film, b: Film): number => (b.filmInfo.totalRating || 0) - (a.filmInfo.totalRating || 0);


const getRatingByWatched = (count: number): string => {
  if (count >= Rating.MovieBuff.count) {
    return Rating.MovieBuff.name;
  }

  if (count >= Rating.Fan.count) {
    return Rating.Fan.name;
  }

  if (count >= Rating.Novice.count) {
    return Rating.Novice.name;
  }

  return '';
};

const getWatchListFilms = (films: Film[]): Film[] => films.filter((film) => film.userDetails.watchList);

const getWatchedFilms = (films: Film[]): Film[] => films.filter((film) => film.userDetails.alreadyWatched);

const getFavoriteFilms = (films: Film[]): Film[] => films.filter((film) => film.userDetails.favorite);

const getFilteredFilms = (films: Film[], filter: FilmFilter): Film[] => {
  switch (filter) {
    case FilmFilter.Favorites:
      return getFavoriteFilms(films);
    case FilmFilter.History:
      return getWatchedFilms(films);
    case FilmFilter.WatchList:
      return getWatchListFilms(films);
    default:
      return films;
  }
};

const getSortedFilms = (films: Film[], sortType: SortType): Film[] => {
  switch (sortType) {
    case SortType.Date:
      return [...films].sort(sortDate);
    case SortType.Rating:
      return [...films].sort(sortRating);
    default:
      return [...films];
  }
};

const getSortedFilteredFilms = (films: Film[], filter: FilmFilter, sortType: SortType): Film[] => {
  const filtered = getFilteredFilms(films, filter);
  return getSortedFilms(filtered, sortType);
};

const cutOffDescription = (description: string): string => {
  if (!description) {
    return '';
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...`;
  }
  return description;
};

const createNewFilms = (films: Film[], newFilm: Film): Film[] => {
  const index = films.findIndex((f) => f.id === newFilm.id);
  return [...films.slice(0, index), newFilm, ...films.slice(index + 1)];
};

const capitalize = (item: string): string => `${item[0].toUpperCase()}${item.slice(1)}`;

const changeStatusFilm = (film: Film, btnType: BtnType, status: boolean): ServerFilm => adaptToServer({...film, userDetails: {...film.userDetails, [btnType]: status}});


export {
  getWatchListFilms,
  getWatchedFilms,
  getFavoriteFilms,
  getFilteredFilms,
  getSortedFilms,
  getSortedFilteredFilms,
  sortAndCut,
  getTopFilms,
  getMostCommentedFilms,
  sortDate,
  sortRating,
  getRatingByWatched,
  cutOffDescription,
  createNewFilms,
  capitalize,
  changeStatusFilm
};
