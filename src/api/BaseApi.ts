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
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
} = baseApi;
