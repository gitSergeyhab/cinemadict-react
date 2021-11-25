import { Film, ServerFilm } from '../types/types';

export const adaptToClient = (film: any): Film => {
  const adaptedFilm = {
    ...film,
    userDetails: {
      watchList: film['user_details']['watchlist'],
      alreadyWatched: film['user_details']['already_watched'],
      watchingDate: film['user_details']['watching_date'],
      favorite: film['user_details']['favorite'],
    },
    filmInfo: {
      ...film['film_info'],
      alternativeTitle: film['film_info']['alternative_title'],
      totalRating: film['film_info']['total_rating'],
      ageRating: film['film_info']['age_rating'],
      release: {
        date: film['film_info']['release']['date'],
        releaseCountry: film['film_info']['release']['release_country'],
      },
    }};

  delete adaptedFilm['user_details'];
  delete adaptedFilm['film_info'];
  delete adaptedFilm.filmInfo['alternative_title'];
  delete adaptedFilm.filmInfo['total_rating'];
  delete adaptedFilm.filmInfo['age_rating'];

  return adaptedFilm as Film;
};

export const adaptToServer = (film: any): ServerFilm => {
  const adaptedFilm = {
    ...film,
    'user_details': {
      'favorite': film.userDetails.favorite,
      'watchlist': film.userDetails.watchList,
      'already_watched': film.userDetails.alreadyWatched,
      'watching_date': film.userDetails.watchingDate,
    },
    'film_info': {
      ...film.filmInfo,
      'alternative_title': film.filmInfo.alternativeTitle,
      'total_rating': film.filmInfo.totalRating,
      'age_rating': film.filmInfo.ageRating,
      'release': {
        'date': film.filmInfo.release.date,
        'release_country': film.filmInfo.release.releaseCountry,
      },
    }};

  delete adaptedFilm.userDetails;
  delete adaptedFilm.filmInfo;
  delete adaptedFilm['film_info']['alternativeTitle'];
  delete adaptedFilm['film_info']['totalRating'];
  delete adaptedFilm['film_info']['ageRating'];

  return adaptedFilm as ServerFilm;
};
