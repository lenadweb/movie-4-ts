import { useDispatch } from 'react-redux';
import { toast } from 'redux/reducers/ToastsSlice';

interface IReturnValue {
    success: (caption?: string) => void;
    warning: (caption?: string) => void;
    error: (caption?: string) => void;
}

const useToast = (): IReturnValue => {
    const dispatch = useDispatch();

    const success = (caption = ''): void => {
        dispatch(toast({
            type: 'success',
            caption,
        }));
    };

    const warning = (caption = ''): void => {
        dispatch(toast({
            type: 'warning',
            caption,
        }));
    };

    const error = (caption = ''): void => {
        dispatch(toast({
            type: 'error',
            caption,
        }));
    };

    return {
        success,
        warning,
        error,
    };
};

export default useToast;
