import { Api } from '@reduxjs/toolkit/dist/query';

export interface IStore {
    baseApi: Api<any, any, any, any>
}
