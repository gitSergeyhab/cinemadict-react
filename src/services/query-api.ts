import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { APIroute, BtnType } from '../const';
import { Comment, Film, ServerFilm } from '../types/types';
import { adaptToServer } from './adapters';

const BASE_URL = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic |,,/_Black_Metal_|../';


const TagType = {
  Comments: 'Comments',
  Films: 'Films',
};


const changeStatusFilm = (film: Film, btnType: BtnType, status: boolean) => adaptToServer({...film, userDetails: {...film.userDetails, [btnType]: status}});


export const queryApi = createApi({
  reducerPath: 'queryApi',
  tagTypes: [TagType.Comments, TagType.Films],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', AUTHORIZATION);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getFilms: build.query<ServerFilm[], unknown>({
      query: () => APIroute.Movies,
      providesTags: (result) => result ?
        [ ...result.map(({ id }) => ({ type: TagType.Films, id } as const)), { type: TagType.Films, id: 'LIST' } ] :
        [ { type: TagType.Films, id: 'LIST' } ],
    }),

    putFilm: build.mutation({
      query: ({film, btnType, status}) => ({
        url: `${APIroute.Movies}/${film.id}`,
        method: 'PUT',
        body: changeStatusFilm(film, btnType, status),
      }),
      invalidatesTags: [{type: TagType.Films, id: 'LIST'}],
    }),

    getComments: build.query<Comment[], unknown>({
      query: (id) => `${APIroute.Comments}/${id}`,
      providesTags: (result) => result ?
        [ ...result.map(({ id }) => ({ type: TagType.Comments, id } as const)), { type: TagType.Comments, id: 'LIST' } ] :
        [ { type: TagType.Comments, id: 'LIST' } ],
    }),

    deleteComment: build.mutation({
      query: (id) => ({
        url: `${APIroute.Comments}/${id}_`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: TagType.Comments, id: 'LIST'}, {type: TagType.Films, id: 'LIST'}],
    }),

    addComment: build.mutation({
      query: ({body, filmId}) => ({
        url: `${APIroute.Comments}/${filmId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: TagType.Comments, id: 'LIST'}, {type: TagType.Films, id: 'LIST'}],
    }),
  }),
});


export const { useGetCommentsQuery, useGetFilmsQuery, useDeleteCommentMutation, useAddCommentMutation, usePutFilmMutation } = queryApi;
