import { removeToken } from 'helpers/authHelper';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../../redux/reducers/UserSlice';

const LogoutPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = useCallback(async () => {
        removeToken();
        dispatch(resetUser());
        navigate('/');
    }, [dispatch]);

    useEffect(() => {
        logoutHandler();
    }, [logoutHandler]);

    return null;
};

export default LogoutPage;
