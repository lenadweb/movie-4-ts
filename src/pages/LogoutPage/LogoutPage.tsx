import { removeToken } from 'helpers/authHelper';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = useCallback(async () => {
        removeToken();
        navigate('/');
    }, [dispatch]);

    useEffect(() => {
        logoutHandler();
    }, [logoutHandler]);

    return null;
};

export default LogoutPage;
