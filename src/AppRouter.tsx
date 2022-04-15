import { PrivateRoute } from 'components/utils/PrivateRoute/PrivateRoute';
import RouterOpacityFade from 'components/utils/RouterOpacityFade/RouterOpacityFade';
import useAuth from 'hooks/useAuth';
import React, { FC, Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter, matchRoutes, Route, Routes, useLocation } from 'react-router-dom';
import { appRoutes } from './constants/routes';
import { IRoute } from './types/routes';

const AppRouter: FC = () => {
    const location = useLocation();
    const isAuth = useAuth();

    useEffect(() => {
        // if (filmId) getTorrents(request);
        console.log('mount');
        return () => {
            console.log('unmount');
        };
    }, []);

    const renderRoutes = useCallback((routes) => routes.length
        && routes.map(({ path, requireAuth, element, children }: IRoute) => (
            <Route
                key={path}
                path={path}
                element={requireAuth
                    ? (
                        <PrivateRoute>
                            { element }
                        </PrivateRoute>
                    )
                    : element}
            >
                { children ? renderRoutes(children) : null }
            </Route>
        )), []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes location={location}>
                { renderRoutes(appRoutes) }
            </Routes>
        </Suspense>
    // <RouterOpacityFade group location={location.pathname.includes('/login')}>
    );
};

export default AppRouter;
