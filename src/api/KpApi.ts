import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from 'redux/store/store';

export const API_URL = 'https://kinopoiskapiunofficial.tech/api/';

const prepareHeaders = (headers: any): any => {
    headers.set('X-API-KEY', '5f27c47d-dec6-431d-9a46-be06e0f76b58');
    headers.set('Content-type', 'application/json');
    return headers;
};

export const kpApi = createApi({
    reducerPath: 'kpApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders,
    }),
    tagTypes: ['movies'],
    endpoints: (builder) => ({
        getRandomMovies: builder.query({
            query: () => {
                const year = Math.round(1989 - 0.5 + Math.random() * (2021 - 1989 + 1));
                const page = Math.round(1 - 0.5 + Math.random() * (5));
                return ({
                    url: `/v2.2/films/?order=NUM_VOTE&type=FILM&ratingTo=10&yearFrom=${year}&yearTo=${year}&page=${page}`,
                    method: 'GET',
                });
            },
            providesTags: ['movies'],
        }),
        getMovieInformation: builder.query({
            query: (movieId) => ({
                url: `/v2.1/films/${movieId}?append_to_response=BUDGET,RATING`,
                method: 'GET',
            }),
        }),
        getMovieStaff: builder.query({
            query: (movieId) => ({
                url: `/v1/staff/?filmId=${movieId}`,
                method: 'GET',
            }),
        }),
        getMovieTrailers: builder.query({
            query: (movieId) => ({
                url: `/v2.1/films/${movieId}/videos`,
                method: 'GET',
            }),
        }),
        getSimilarMovies: builder.query({
            query: (movieId) => ({
                url: `/v2.2/films/${movieId}/similars`,
                method: 'GET',
            }),
        }),
        getPrequels: builder.query({
            query: (movieId) => ({
                url: `/v2.1/films/${movieId}/sequels_and_prequels`,
                method: 'GET',
            }),
        }),
        getMovies: builder.mutation({
            query: ({ keyword, page }) => ({
                url: `/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,
                method: 'GET',
            }),
        }),
        searchByFilters: builder.mutation({
            query: ({ ratingFrom, ratingTo, yearFrom, yearTo, genres, page }) => ({
                url: `/v2.2/films?ratingFrom=${ratingFrom}&ratingTo=${ratingTo}&yearFrom=${yearFrom}&yearTo=${yearTo}&genres=${genres.join(',')}&page=${page}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetRandomMoviesQuery,
    useGetMovieInformationQuery,
    useGetMovieStaffQuery,
    useGetSimilarMoviesQuery,
    useGetMovieTrailersQuery,
    useGetPrequelsQuery,
    useGetMoviesMutation,
    useSearchByFiltersMutation,
} = kpApi;
