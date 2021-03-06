export const FILM_PORTION = 5;

export const CLASS_HIDE_SCROLL = 'hide-overflow';

export const enum AgeRating {
  Zero = '0+',
  Six = '6+',
  Twelve = '12+',
  Sixteen = '16+',
  Eighteen = '18+',
  No = '',
}

export const enum Emotion {
  Smile = 'smile',
  Sleeping = 'sleeping',
  Puke = 'puke',
  Angry = 'angry'
}

export const enum APIroute {
  Movies = '/movies',
  Comments = '/comments',
  Sync = '/movies/sync',
}

export const enum FilmFilter {
  AllMovies = 'All movies',
  WatchList  = 'Watchlist',
  History = 'History',
  Favorites = 'Favorites',
  Stats = 'Stats',
}

export const EmptyResultMessage = {
  All: 'There are no movies in our database',
  WatchList: 'There are no movies to watch now',
  History: 'There are no watched movies now',
  Favorites: 'There are no favorite movies now',
};

export const enum FilmListType {
  AllMovies = 'All movies',
  TopRated = 'Top rated',
  MostCommented = 'Most commented',
}

export const enum BtnType {
  WatchList = 'watchList',
  AlreadyWatched = 'alreadyWatched',
  Favorite = 'favorite',
}

export const enum SortType {
  Default = 'default',
  Date = 'date',
  Rating = 'rating',
}

export const enum FilmSectionName {
  TopRated = 'Top rated',
  MostCommented = 'Most commented',
  AllMovies = 'All movies'
}

export const Rating = {
  Novice: {
    name: 'Novice',
    count: 1,
  },
  Fan: {
    name: 'Fan',
    count: 11,
  },
  MovieBuff: {
    name: 'Movie Buff',
    count: 21,
  },
};

export enum Period {
  All = 'all time',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export enum AppRoute {
  Main = '/',
  Stats = '/stats',
}

export const enum ErrorMessage {
  FetchFilmAction = 'unable to download movies',
  PostStatusFilm = 'unable to change status the movie',
  FetchCommentsAction = 'unable to download the comments',
  PostCommentAction = 'unable to add comment to this movie',
  DeleteCommentAction = 'unable to remove this comment',
}
