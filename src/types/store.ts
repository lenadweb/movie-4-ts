import { Api } from '@reduxjs/toolkit/dist/query';

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
    countPage: number | null,
    movieInformation: any,
    listFilms: Array<any>,
    loadingStaffInformation: boolean,
    staff: any,
    loadingTrailers: boolean,
    trailers: any,
    loadingSimilarFilms: boolean,
    similarFilms: any,
    prequels: any,
    loadingPrequels: boolean,
    torrents: Array<any>,
    loadingTorrents: boolean,
}

export interface IStore {
    kpApi: Api<any, any, any, any>;
    baseApi: Api<any, any, any, any>;
    app: IAppSlice;
    user: IUserState;
    movies: IMoviesSlice;
}
