import { createSlice } from '@reduxjs/toolkit';
import { Period } from '../../const';


type StatState = {period: Period}

const initialState: StatState = {period: Period.All};

export const statsReducer = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setPeriod(state, action) {state.period = action.payload;},
  },
});

export const {setPeriod} = statsReducer.actions;
