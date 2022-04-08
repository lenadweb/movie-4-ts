import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from 'redux/store/store';

export const API_URL = 'http://192.168.1.41:8000/api/v1';
export const API_URL_TEST = 'http://195.161.62.60:8080/api/v1';

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
        baseUrl: API_URL_TEST,
        prepareHeaders,
    }),
    tagTypes: ['comments', 'user', 'layers'],
    endpoints: () => ({}),
});
