import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { Film } from '../types/types.js';
import { getHoursAndMinutes, HoursAndMinutesType } from './date-time-utils';
import { Period } from '../const';


const MAX_PERIOD_IN_YEARS = 120;


dayjs.extend(isBetween);

type CountGenreType = {genre: string, count: number};

const getCountItemInArray = (item: string, arr: string[]): number => arr.filter((arrItem) => item === arrItem).length;

const sortGenresByCount = (genreA: CountGenreType, genreB: CountGenreType) => genreB.count - genreA.count;

const filterWatchedFilmsByTime = (films: Film[], from: Date, to: Date): Film[] => films.filter((film) => dayjs(film.userDetails.watchingDate).isBetween(from, to));

const getGenresFromFilms = (films: Film[]): string[][] => films.map((film) => film.filmInfo.genre);


const getAllGenres = (genreList: string[][]): string[] => genreList.reduce((acc, list) =>([...acc, ...list]) , []);

const getGenres = (genreList: string[][]): string[] => ([...new Set(getAllGenres(genreList))]);


type GenresCountsType = {genres: string[], counts: number[]}

const getSortingCountGenres = (films: Film[]): GenresCountsType => {
  const genreList = getGenresFromFilms(films);
  const allGenres = getAllGenres(genreList);
  const genresByCount = getGenres(genreList).map((genre) => ({genre, count: getCountItemInArray(genre, allGenres)}));

  genresByCount.sort(sortGenresByCount);
  return {
    genres: genresByCount.map((item) => item.genre),
    counts: genresByCount.map((item) => item.count),
  };
};

const getTotalDuration = (films: Film[]): HoursAndMinutesType => getHoursAndMinutes(films.reduce((acc, film) => acc + film.filmInfo.runtime, 0));

const getDatePeriod = (period: Period): {from: Date, to: Date} => {
  const to = dayjs().toDate();
  if (period && period !== Period.All) {
    return {from: dayjs().subtract(1, period).toDate(), to};
  }

  return  {from: dayjs().subtract(MAX_PERIOD_IN_YEARS, Period.Year).toDate(), to};
};


export {
  filterWatchedFilmsByTime,
  getTotalDuration,
  getSortingCountGenres,
  getDatePeriod,
  getGenres,
  getGenresFromFilms
};
