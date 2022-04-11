import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from 'api/BaseApi';
import { combineReducers } from 'redux';
import UserSlice from 'redux/reducers/UserSlice';
import MoviesSlice from 'redux/reducers/MoviesSlice';
import AppSlice from 'redux/reducers/AppSlice';
import { kpApi } from '../../api/KpApi';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    [kpApi.reducerPath]: kpApi.reducer,
    app: AppSlice,
    user: UserSlice,
    movies: MoviesSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(kpApi.middleware),
    // .concat(logger),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});
