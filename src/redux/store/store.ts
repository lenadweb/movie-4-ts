import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'api/AuthApi';
import { combineReducers } from 'redux';
import UserSlice from 'redux/reducers/UserSlice';
import { baseApi } from '../../api/BaseApi';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    user: UserSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(baseApi.middleware),
    // .concat(logger),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});
