import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from 'api/BaseApi';
import { combineReducers } from 'redux';
import UserSlice from 'redux/reducers/UserSlice';
import MoviesSlice from 'redux/reducers/MoviesSlice';
import ToastsSlice from 'redux/reducers/ToastsSlice';
import AppSlice from 'redux/reducers/AppSlice';
import { kpApi } from '../../api/KpApi';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    [kpApi.reducerPath]: kpApi.reducer,
    app: AppSlice,
    user: UserSlice,
    movies: MoviesSlice,
    toasts: ToastsSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(kpApi.middleware).concat(baseApi.middleware),
    // .concat(logger),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});
