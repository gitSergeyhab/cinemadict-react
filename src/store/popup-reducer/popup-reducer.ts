import { createReducer } from '@reduxjs/toolkit';
import { Comment, Film } from '../../types/types';
import { loadComments, setCommentsError, setCommentsLoadedStatus, setFilmToPopup } from '../actions';

type PopupState = {
  comments: Comment[],
  areCommentsLoaded: boolean,
  popupFilm: Film | null,
  loadingError: boolean,
}

const initialState: PopupState = {
  comments: [],
  areCommentsLoaded: false,
  popupFilm: null,
  loadingError: false,
};

export const popupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
      state.areCommentsLoaded = true;
    })
    .addCase(setFilmToPopup, (state, action) => {state.popupFilm = action.payload;})
    .addCase(setCommentsLoadedStatus, (state, action) => {state.areCommentsLoaded = action.payload;})
    .addCase(setCommentsError, (state, action) => {state.loadingError = action.payload;});

});

