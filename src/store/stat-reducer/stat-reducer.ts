import { createReducer } from '@reduxjs/toolkit';
import { Period } from '../../const';
import { setPeriod } from '../actions';

type StatState = {period: Period}

const initialState: StatState = {period: Period.All};

export const statReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPeriod, (state, action) => {state.period = action.payload;});
});
