import { createSlice } from '@reduxjs/toolkit';
import { getToken } from 'helpers/authHelper';
import { IAppSlice, IMoviesSlice, IStore, IUserState } from 'types/store';
import { kpApi } from '../../api/KpApi';

const initialState:IAppSlice = {
    pageLoading: true,
    sidebarVisible: false,
};

const AppSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setPageLoading(state, action) {
            state.pageLoading = action.payload;
        },
        setSidebarVisible(state, action) {
            state.sidebarVisible = action.payload;
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
                kpApi.endpoints.searchByFilters.matchFulfilled,
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
    setSidebarVisible,
} = AppSlice.actions;
export default AppSlice.reducer;
export const selectPageLoading = (state: IStore): boolean => state.app.pageLoading;
export const selectSidebarVisible = (state: IStore): boolean => state.app.sidebarVisible;
