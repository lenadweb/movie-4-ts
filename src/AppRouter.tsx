import { PrivateRoute } from 'components/utils/PrivateRoute/PrivateRoute';
import RouterOpacityFade from 'components/utils/RouterOpacityFade/RouterOpacityFade';
import useAuth from 'hooks/useAuth';
import React, { FC, useCallback, useEffect } from 'react';
import { BrowserRouter, matchRoutes, Route, Routes, useLocation } from 'react-router-dom';
import { appRoutes } from './constants/routes';
import { IRoute } from './types/routes';

const AppRouter: FC = () => {
    const location = useLocation();
    const isAuth = useAuth();

    useEffect(() => {
        const matchedRoutes = matchRoutes(appRoutes, location.pathname);
        // @ts-ignore
        const title = matchedRoutes?.[matchedRoutes.length - 1].route.name;
        if (title) document.title = title;
    }, [location]);

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
                { children && renderRoutes(children) }
            </Route>
        )), []);

    return (
        <Routes location={location}>
            { renderRoutes(appRoutes) }
        </Routes>
    // <RouterOpacityFade group location={location.pathname.includes('/login')}>
    );
};

export default AppRouter;
