import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from 'redux/store/store';
import { IGetMovieState, IGetMyRatesMovies, IGetWishMovies } from 'types/api';
import { IMovieInformation } from '../types/movies';

export const API_URL = 'https://devlo.ru/api/';
export const API_URL_TEST = 'http://localhost:8000/api/';

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
    tagTypes: ['rating', 'comments', 'movieState'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: any) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        registration: builder.mutation({
            query: (body: any) => ({
                url: 'auth/registration',
                method: 'POST',
                body,
            }),
        }),
        getMe: builder.query({
            query: (token: string) => ({
                url: 'auth/getMe',
                method: 'GET',
            }),
        }),
        getRating: builder.query({
            query: (movieId: number) => ({
                url: `movie/getRating?movieId=${movieId}`,
                method: 'GET',
            }),
            providesTags: ['rating'],
        }),
        setRating: builder.mutation({
            query: ({ movieId, rating, movieContent }: { movieId: string, rating: number, movieContent: any}) => ({
                url: 'movie/setRating',
                method: 'POST',
                body: {
                    movieId,
                    rate: rating,
                    movieContent,
                },
            }),
            invalidatesTags: ['rating', 'movieState'],
        }),
        getTorrents: builder.mutation({
            query: (q: string) => ({
                url: `torrents/search?q=${q}`,
                method: 'GET',
            }),
        }),
        getMyRatesMovies: builder.query<IGetMyRatesMovies[], string>({
            query: (movieId) => ({
                url: 'movie/getMyRates',
                method: 'GET',
            }),
        }),
        getWishMovies: builder.query<IGetWishMovies[], string>({
            query: (movieId) => ({
                url: 'movie/getWishMovies',
                method: 'GET',
            }),
        }),
        getMovieState: builder.query<IGetMovieState, string>({
            query: (movieId) => ({
                url: `movie/getMovie?movieId=${movieId}`,
                method: 'GET',
            }),
            providesTags: ['movieState'],
        }),
        setWishMovie: builder.mutation<IGetMovieState, any>({
            query: ({ movieId, value, movieContent }) => ({
                url: 'movie/setWishMovie',
                method: 'POST',
                body: { movieId, value, movieContent },
            }),
            invalidatesTags: ['movieState'],
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
    useGetMyRatesMoviesQuery,
    useGetMovieStateQuery,
    useSetWishMovieMutation,
    useGetWishMoviesQuery,
} = baseApi;
