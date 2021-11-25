import { createAction } from '@reduxjs/toolkit';
import { FilmFilter, Period, SortType } from '../const';
import { Comment, Film } from '../types/types';

export const enum ActionType {
  LoadFilms = 'data/films/LoadFilms',
  SetFilter = 'films/SetFilter',
  SetSortType = 'films/SetSortType',
  SetShownFilmCount = 'films/SetShownFilmCount',
  SortFilterFilms = 'films/SortFilterFilms',
  GetTopRated = 'films/GetTopRated',
  GetMostCommented = 'films/GetMostCommented',
  LoadComments = 'data/popup/LoadComments',
  SetFilmToPopup = 'popup/SetFilmToPopup',
  SetCommentsLoadedStatus = 'popup/SetCommentsLoadedStatus',
  SetPeriod = 'stats/SetPeriod',
}


export const loadFilms = createAction(ActionType.LoadFilms, (films: Film[]) => ({payload: films}));

export const setFilter = createAction(ActionType.SetFilter, (filter: FilmFilter) => ({payload: filter}));

export const setSortType = createAction(ActionType.SetSortType, (sortType: SortType) => ({payload: sortType}));

export const sortFilterFilms = createAction(ActionType.SortFilterFilms);

export const setShownFilmCount = createAction(ActionType.SetShownFilmCount, (count: number) => ({payload: count}));


export const setFilmToPopup = createAction(ActionType.SetFilmToPopup, (film: Film | null) => ({payload: film}));

export const loadComments = createAction(ActionType.LoadComments, (comments: Comment[]) => ({payload: comments}));

export const setCommentsLoadedStatus = createAction(ActionType.SetCommentsLoadedStatus, (status: boolean) => ({payload: status}));


export const setPeriod = createAction(ActionType.SetPeriod, (period: Period) => ({payload: period}));


