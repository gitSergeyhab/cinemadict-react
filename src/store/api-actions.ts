import { toast } from 'react-toastify';

import { adaptToClient, adaptToServer } from '../services/adapters';
import { Comment, Film, ServerFilm, ThunkActionResult } from '../types/types';
import { loadComments, loadFilms, setCommentsError, setFilmError, setFilmToPopup, sortFilterFilms } from './actions';
import { createNewFilms } from '../utils/utils';
import { APIroute, BtnType, Emotion } from '../const';


const ErrorMessage = {
  FetchFilmAction: 'unable to download movies',
  PostStatusFilm: 'unable to change status the movie',
  FetchCommentsAction: 'unable to download the comments',
  PostCommentAction: 'unable to add comment to this movie',
  DeleteCommentAction: 'unable to remove this comment',
};


export const fetchFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(setFilmError(false));
      const {data} = await api.get<ServerFilm[]>(APIroute.Movies);
      const films = data.map((film) => adaptToClient(film));
      dispatch(loadFilms(films));
    } catch {
      dispatch(setFilmError(true));
      toast.error(ErrorMessage.PostCommentAction);
    }
  };


type PostStatusFilm = {film: Film, btnType: BtnType, status: boolean};

export const postStatusFilm = ({film, btnType, status} : PostStatusFilm): ThunkActionResult =>
  async (dispatch, getState, api) => {
    try {
      const changedFilm = {
        ...film, userDetails: {
          ...film.userDetails,
          [btnType]: status,
        },
      };

      const serverFilm = adaptToServer(changedFilm);
      const {data} = await api.put<ServerFilm>(`${APIroute.Movies}/${film.id}`, serverFilm);
      const films = getState().Film.films;
      const newFilm = adaptToClient(data);
      const newFilms = createNewFilms(films, newFilm);
      dispatch(loadFilms(newFilms));
      dispatch(sortFilterFilms());

      const popupFilm = getState().Popup.popupFilm;
      if (popupFilm && popupFilm.id === film.id) {
        dispatch(setFilmToPopup(newFilm));
      }
    } catch {
      toast.error(ErrorMessage.PostStatusFilm);
    }
  };


export const fetchCommentsAction = (filmId: string): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      dispatch(setCommentsError(false));
      const {data} = await api.get<Comment[]>(`${APIroute.Comments}/${filmId}`);
      dispatch(loadComments(data));

    } catch {
      dispatch(setCommentsError(true));
      toast.error(ErrorMessage.FetchCommentsAction);
    }
  };


type PostCommentType = {id: string, comment: string, emotion: Emotion, unBlock: () => void, clear: () => void, setShake: (isShake: boolean) => void}

export const postCommentAction = ({id, comment, emotion, unBlock, clear, setShake} : PostCommentType): ThunkActionResult =>
  async(dispatch, getState, api) => {
    try {
      const {data} = await api.post(`${APIroute.Comments}/${id}`, {comment, emotion});
      const films = getState().Film.films;
      const newFilm = adaptToClient(data.movie);
      const newFilms = createNewFilms(films, newFilm);
      dispatch(loadFilms(newFilms));
      dispatch(sortFilterFilms());
      dispatch(loadComments(data.comments));
      clear();

    } catch {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
      toast.error(ErrorMessage.PostCommentAction);
    }
    unBlock();
  };


type DeleteCommentType = {commentId: string, film: Film, unBlock: () => void, setShake: (isShake: boolean) => void}

export const deleteCommentAction = ({commentId, film, unBlock, setShake} : DeleteCommentType): ThunkActionResult =>
  async(dispatch, getState, api) => {
    try {
      await api.delete(`${APIroute.Comments}+/${commentId}`);

      const films = getState().Film.films;
      const commentIdInMovie = [...film.comments];
      const newComments = commentIdInMovie.filter((oldId) => oldId !== commentId);
      const newFilm = {...film, comments: newComments};
      const newFilms = createNewFilms(films, newFilm);

      dispatch(loadFilms(newFilms));
      dispatch(sortFilterFilms());
      dispatch(fetchCommentsAction(film.id));

    } catch {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
      toast.error(ErrorMessage.DeleteCommentAction);
    }
    unBlock();
  };

