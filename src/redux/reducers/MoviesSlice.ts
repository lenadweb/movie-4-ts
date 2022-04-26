import { createSlice } from '@reduxjs/toolkit';
import { getToken } from 'helpers/authHelper';
import { IMoviesSlice, IStore, IUserState } from 'types/store';
import { kpApi } from '../../api/KpApi';
import { IMainMovieInfo, IMovieInformation, IMovieListItem, IStaffItem } from '../../types/movies';

const initialState:IMoviesSlice = {
    countPage: 0,
    movieInformation: null,
    listFilms: [],
    loadingStaffInformation: false,
    staff: [],
    loadingTrailers: false,
    trailers: null,
    loadingSimilarFilms: false,
    similarFilms: [],
    prequels: [],
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
        setCountPage(state, action) {
            state.countPage = action.payload;
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
                kpApi.endpoints.getPrequels.matchRejected,
                (state: IMoviesSlice) => {
                    state.prequels = [];
                },
            )
            .addMatcher(
                kpApi.endpoints.getSimilarMovies.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.similarFilms = payload.items;
                },
            )
            .addMatcher(
                kpApi.endpoints.getSimilarMovies.matchRejected,
                (state: IMoviesSlice) => {
                    state.similarFilms = [];
                },
            )
            .addMatcher(
                kpApi.endpoints.searchByFilters.matchFulfilled,
                (state: IMoviesSlice, { payload }: { payload: any }) => {
                    state.listFilms.push(...payload.items);
                    state.countPage = payload.totalPages;
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
    setCountPage,
} = MoviesSlice.actions;
export default MoviesSlice.reducer;
export const selectListFilms = (state: IStore): IMovieListItem[] => state.movies.listFilms;
export const selectCountPage = (state: IStore): number => state.movies.countPage;
export const selectMovieInformation = (state: IStore): IMovieInformation | null => state.movies.movieInformation;
export const selectTrailers = (state: IStore): any => state.movies.trailers;
export const selectStaff = (state: IStore): IStaffItem[] => state.movies.staff;
export const selectPrequels = (state: IStore): IMainMovieInfo[] => state.movies.prequels;
export const selectSimilar = (state: IStore): IMainMovieInfo[] => state.movies.similarFilms;
export const selectPending = (endpoints: Array<string>) => (state: any): boolean => Object.values({
    ...state.kpApi.queries,
    ...state.baseApi.queries,
})
    .some(({ status, endpointName }: any) => endpoints.includes(endpointName) && status === 'pending');
