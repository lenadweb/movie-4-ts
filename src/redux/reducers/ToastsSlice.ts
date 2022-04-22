import { createSlice } from '@reduxjs/toolkit';
import { IStore } from '../../types/store';

export type TToastItem = {
    type: 'warning' | 'error' | 'success';
    caption: string
}

export interface IToastSlice {
    toasts: Array<TToastItem>
}

const initialState: IToastSlice = {
    toasts: [],
};

const ToastsSlice = createSlice({
    name: 'toastsSlice',
    initialState,
    reducers: {
        toast(state, action) {
            state.toasts.push({
                type: action.payload.type,
                caption: action.payload.caption,
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (match) => match?.meta?.requestStatus === 'rejected',
                (state, { payload }) => {
                    if (typeof payload?.error === 'string') {
                        state.toasts.push({
                            type: 'error',
                            caption: payload?.error,
                        });
                    }
                },
            );
    },
});

export const { toast } = ToastsSlice.actions;
export default ToastsSlice.reducer;

export const selectToasts = (state: IStore): Array<TToastItem> => state.toasts.toasts;
