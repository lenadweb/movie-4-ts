import { baseApi } from './BaseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder: any) => ({
        login: builder.mutation({
            query: (credentials: any) => ({
                url: 'user/token',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['user'],
        }),
        getMe: builder.query({
            query: () => ({
                url: 'user/test-token',
                method: 'GET',
            }),
            providesTags: ['user'],
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useGetMeQuery } = authApi;
