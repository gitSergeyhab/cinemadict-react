export const FILM_PORTION = 5;

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
}

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

export const EmptyResultMessage = {
  [FilmFilter.AllMovies]: 'There are no movies in our database',
  [FilmFilter.WatchList]: 'There are no movies to watch now',
  [FilmFilter.History]: 'There are no watched movies now',
  [FilmFilter.Favorites]: 'There are no favorite movies now',
};

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

export const enum Period {
  All = 'all time',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}


