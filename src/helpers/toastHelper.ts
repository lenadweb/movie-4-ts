import { toast } from 'redux/reducers/ToastsSlice';
import { store } from 'redux/store/store';

interface IRequireAuth<T> {
    cb: T
}

export const requireAuth = (cb: () => any): () => void => {
    const isAuth = !!store.getState().user.token;
    if (!isAuth) {
        return () => {
            store.dispatch(toast({
                type: 'error',
                caption: 'Доступно только авторизированным пользователям',
            }));
        };
    }
    return cb;
};
