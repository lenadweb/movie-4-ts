import { Api } from '@reduxjs/toolkit/dist/query';
import { IToastSlice, TToastItem } from 'redux/reducers/ToastsSlice';
import { IMainMovieInfo, IMovieInformation, IMovieListItem, IStaffItem, ITorrentItem } from './movies';

export interface IAppSlice {
    pageLoading: boolean;
}

export interface IUserState {
    username: string | null;
    token: string | null;
    role: string | null;
    email: string | null;
    id: number | null;
}

export interface IMoviesSlice {
    countPage: number,
    movieInformation: IMovieInformation | null,
    listFilms: IMovieListItem[],
    loadingStaffInformation: boolean,
    staff: IStaffItem[],
    loadingTrailers: boolean,
    trailers: any,
    loadingSimilarFilms: boolean,
    similarFilms: IMainMovieInfo[],
    prequels: IMainMovieInfo[],
    loadingPrequels: boolean,
    torrents: ITorrentItem[],
    loadingTorrents: boolean,
}

export interface IStore {
    kpApi: Api<any, any, any, any>;
    baseApi: Api<any, any, any, any>;
    app: IAppSlice;
    user: IUserState;
    movies: IMoviesSlice;
    toasts: IToastSlice
}
