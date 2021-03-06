import { createSlice } from '@reduxjs/toolkit';
import { getToken } from 'helpers/authHelper';
import { IStore, IUserState } from 'types/store';
import { baseApi } from '../../api/BaseApi';

const initialState = {
    username: null,
    token: getToken(),
    role: null,
    email: null,
    id: null,
};

const UserSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout(state: IUserState) {
            state.token = null;
            localStorage.removeItem('token');
        },
        setPersonalInfo(state: IUserState, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
        },
        resetUser(state: IUserState) {
            state.username = null;
            state.role = null;
            state.token = null;
            state.email = null;
            state.id = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                baseApi.endpoints.login.matchFulfilled,
                (state: IUserState, { payload }: { payload: any }) => {
                    if (payload.token) {
                        state.token = payload.token;
                    }
                },
            )
            .addMatcher(
                baseApi.endpoints.getMe.matchFulfilled,
                (state: IUserState, { payload }: { payload: any }) => {
                    state.email = payload.email;
                    state.id = payload.id;
                    state.role = payload.role;
                    state.username = payload.name;
                },
            )
            .addMatcher(
                baseApi.endpoints.registration.matchFulfilled,
                (state: IUserState, { payload }: { payload: any }) => {
                    if (payload) {
                        console.log(payload);
                    }
                },
            );
    },
});

export const {
    logout,
    setPersonalInfo,
    resetUser,
} = UserSlice.actions;
export default UserSlice.reducer;
export const selectAuth = (state: IStore): boolean => !!state.user.token;
export const selectToken = (state: IStore): string | null => state.user.token;
export const selectUser = (state: IStore): IUserState => state.user;
//
// .addMatcher(
//     baseApi.endpoints.getMe.matchFulfilled,
//     (state: IUserState, { payload }: { payload: any }) => {
//         if (payload) {
//             state.email = payload.email;
//             state.id = payload.id;
//             state.role = payload.role.name;
//         }
//     },
// );
