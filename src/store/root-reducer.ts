import { combineReducers } from 'redux';

import { popupReducer } from './popup-reducer/popup-reducer';
import { filmReducer } from './film-reducer/film-reducer';
import { statReducer } from './stat-reducer/stat-reducer';


export const enum ReducerName {
  Film = 'Film',
  Popup = 'Popup',
  Stat = 'Stat',
}

export const rootReducer = combineReducers({
  [ReducerName.Film]: filmReducer,
  [ReducerName.Popup]: popupReducer,
  [ReducerName.Stat]: statReducer,
});

export type State = ReturnType<typeof rootReducer>;
