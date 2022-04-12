import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from 'redux/store/store';

export const API_URL = 'https://devlo.ru/api/';

const prepareHeaders = (headers: any): any => {
    const { token } = store.getState().user;
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders,
    }),
    tagTypes: ['rating', 'comments'],
    endpoints: (builder: any) => ({
        login: builder.mutation({
            query: (body: any) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
        registration: builder.mutation({
            query: (body: any) => ({
                url: 'registration',
                method: 'POST',
                body,
            }),
        }),
        getMe: builder.query({
            query: (token: string) => ({
                url: 'getMe',
                method: 'GET',
            }),
        }),
        getRating: builder.query({
            query: (movieId: number) => ({
                url: `getMovieRating?movieId=${movieId}`,
                method: 'GET',
            }),
            providesTags: ['rating'],
        }),
        setRating: builder.mutation({
            query: ({ movieId, rating }: { movieId: string, rating: number}) => ({
                url: 'setMovieRating',
                method: 'POST',
                body: {
                    movieId,
                    rate: rating,
                },
            }),
            invalidatesTags: ['rating'],
        }),
        getTorrents: builder.mutation({
            query: (q: string) => ({
                url: `torrents/search?q=${q}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useGetMeQuery,
    useSetRatingMutation,
    useGetRatingQuery,
    useGetTorrentsMutation,
} = baseApi;
