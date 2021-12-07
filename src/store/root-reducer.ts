import { combineReducers } from 'redux';

import { catalogReducer } from './catalog-reducer/catalog-reducer';
import { statsReducer } from './stat-reducer/stat-reducer';
import { queryApi } from '../services/query-api';


export const enum ReducerName {
  Catalog = 'catalog',
  Stats = 'stats',
}

export const rootReducer = combineReducers({
  [queryApi.reducerPath]: queryApi.reducer,
  [ReducerName.Catalog]: catalogReducer.reducer,
  [ReducerName.Stats]: statsReducer.reducer,
});

export type State = ReturnType<typeof rootReducer>;
