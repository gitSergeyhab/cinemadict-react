import { AgeRating, Emotion } from '../const';
import { State } from '../store/root-reducer';
import { AxiosInstance } from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';


export type Comment = {
  id: string,
  author: string,
  comment: string,
  date: string,
  emotion: Emotion,
};


export type UserDetails = {
  watchList: boolean,
  alreadyWatched: boolean,
  watchingDate: string
  favorite: boolean,
};


export type Film = {
  id: string,
  comments: string[],
  filmInfo: {
    title: string,
    alternativeTitle: string,
    totalRating: number,
    poster: string,
    ageRating: AgeRating,
    director: string,
    writers: string[],
    actors: string[],
    release: {
      date: string,
      releaseCountry: string,
    },
    runtime: number,
    genre: string[],
    description:string,
  },
  userDetails: UserDetails,
};

export type RootState = State;


export type ServerFilm = {
    'id': '0',
    'comments': string[],
    'film_info': {
      'title': string,
      'alternative_title'?: string,
      'total_rating'?: number,
      'poster': string,
      'age_rating'?: AgeRating,
      'director': string,
      'writers': string[],
      'actors': string[],
      'release': {
        'date': string,
        'release_country'?: string
      },
      'runtime': number,
      'genre': string[],
      'description': string
    },
    'user_details': {
      'watchlist': boolean,
      'already_watched'?: boolean,
      'watching_date'?: string,
      'favorite': boolean
    }
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, AnyAction>;
