import { createSlice } from '@reduxjs/toolkit';
import { getToken } from 'helpers/AuthHelper';
import { authApi } from '../../api/AuthApi';

export interface IUserState {
    username: string | null;
    token: string | null;
    role: string | null;
    email: string | null;
    id: number | null;
}

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
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state: IUserState, { payload }: { payload: any }) => {
                    if (payload.access_token) {
                        state.token = payload.access_token;
                    }
                },
            )
            .addMatcher(
                authApi.endpoints.getMe.matchFulfilled,
                (state: IUserState, { payload }: { payload: any }) => {
                    if (payload) {
                        state.email = payload.email;
                        state.id = payload.id;
                        state.role = payload.role.name;
                    }
                },
            );
    },
});

export const {
    logout,
    setPersonalInfo,
} = UserSlice.actions;
export default UserSlice.reducer;
export const selectAuth = (state: IStore): boolean => !!state.user.token;
export const selectUser = (state: IStore): IUserState => state.user;
