import { createSlice } from '@reduxjs/toolkit';
import { getToken } from 'helpers/authHelper';
import { IAppSlice, IMoviesSlice, IStore, IUserState } from 'types/store';
import { authApi } from '../../api/AuthApi';
import { kpApi } from '../../api/KpApi';

const initialState:IAppSlice = {
    pageLoading: true,
};

const AppSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setPageLoading(state, action) {
            state.pageLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                kpApi.endpoints.getRandomMovies.matchFulfilled,
                (state: IAppSlice, { payload }: { payload: any }) => {
                    state.pageLoading = false;
                },
            )
            .addMatcher(
                kpApi.endpoints.getRandomMovies.matchPending,
                (state: IAppSlice, { payload }: { payload: any }) => {
                    state.pageLoading = true;
                },
            );
    },
});

export const {
    setPageLoading,
} = AppSlice.actions;
export default AppSlice.reducer;
export const selectPageLoading = (state: IStore): boolean => state.app.pageLoading;
