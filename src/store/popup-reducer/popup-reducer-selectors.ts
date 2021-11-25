import { Comment, Film } from '../../types/types';
import { ReducerName, State } from '../root-reducer';

const field = ReducerName.Popup;

export const getPopupFilm = (state: State): Film | null => state[field].popupFilm;
export const getComments = (state: State): Comment[] => state[field].comments;
export const getCommentsLoadedStatus = (state: State): boolean => state[field].areCommentsLoaded;
