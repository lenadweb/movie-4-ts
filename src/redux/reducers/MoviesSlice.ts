import { createSlice } from '@reduxjs/toolkit';
import { getToken } from 'helpers/authHelper';
import { IMoviesSlice, IStore, IUserState } from 'types/store';
import { kpApi } from '../../api/KpApi';

const initialState:IMoviesSlice = {
    countPage: null,
    movieInformation: null,
    listFilms: [],
    loadingStaffInformation: false,
    staff: null,
    loadingTrailers: false,
    trailers: null,
    loadingSimilarFilms: false,
    similarFilms: null,
    prequels: null,
    loadingPrequels: false,
    torrents: [],
    loadingTorrents: false,
};

const MoviesSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setListFilms(state, action) {
            state.listFilms = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                kpApi.endpoints.getRandomMovies.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.listFilms = payload.items;
                },
            )
            .addMatcher(
                kpApi.endpoints.getMovieInformation.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.movieInformation = payload;
                },
            )
            .addMatcher(
                kpApi.endpoints.getMovieStaff.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.staff = payload;
                },
            )
            .addMatcher(
                kpApi.endpoints.getPrequels.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.prequels = payload;
                },
            )
            .addMatcher(
                kpApi.endpoints.getSimilarMovies.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.similarFilms = payload.items;
                },
            )
            .addMatcher(
                kpApi.endpoints.getMovieTrailers.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.trailers = payload;
                },
            );
    },
});

export const {
    setListFilms,
} = MoviesSlice.actions;
export default MoviesSlice.reducer;
export const selectListFilms = (state: IStore): Array<any> => state.movies.listFilms;
export const selectMovieInformation = (state: IStore): any => state.movies.movieInformation;
export const selectTrailers = (state: IStore): any => state.movies.trailers;
export const selectStaff = (state: IStore): any => state.movies.staff;
export const selectPrequels = (state: IStore): any => state.movies.prequels;
export const selectSimilar = (state: IStore): any => state.movies.similarFilms;
export const selectPending = (endpoints: Array<string>) => (state: any): any => Object.values({
    ...state.kpApi.queries,
    ...state.baseApi.queries,
})
    .some(({ status, endpointName }: any) => endpoints.includes(endpointName) && status === 'pending');
