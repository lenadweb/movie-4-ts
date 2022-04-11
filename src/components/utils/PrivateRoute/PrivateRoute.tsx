import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

export const PrivateRoute: FC<any> = ({ children }) => {
    const isAuth = useAuth();
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};
