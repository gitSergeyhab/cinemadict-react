import { createReducer } from '@reduxjs/toolkit';
import { setPeriod } from '../actions';
import { Period } from '../../const';


type StatState = {period: Period}

const initialState: StatState = {period: Period.All};

export const statReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPeriod, (state, action) => {state.period = action.payload;});
});
