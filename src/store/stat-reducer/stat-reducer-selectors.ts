import { RootState } from '../../types/types';
import { ReducerName } from '../root-reducer';
import { Period } from '../../const';


export const getPeriod = (state: RootState): Period => state[ReducerName.Stat].period;
