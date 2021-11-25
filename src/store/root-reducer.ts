import { combineReducers } from 'redux';
import { popupReducer } from './popup-reducer/popup-reducer';
import { filmReducer } from './film-reducer/film-reducer';

export const enum ReducerName {
  Film = 'Film',
  Popup = 'Popup',
}

export const rootReducer = combineReducers({
  [ReducerName.Film]: filmReducer,
  [ReducerName.Popup]: popupReducer,
});

export type State = ReturnType<typeof rootReducer>;