import React from 'react';
import { IRoute } from 'types/routes';
import WishMovies from 'pages/WishMovies/WishMovies';
import Layout from '../components/layout/Layout/Layout';
import RandomMovies from '../pages/RandomMovies/RandomMovies';
import MoviePage from '../pages/MoviePage/MoviePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import MyRatesMovies from '../pages/MyRatesMovies/MyRatesMovies';
import SearchPage from '../pages/SearchPage/SearchPage';
// const Layout = React.lazy(() => import("../components/layout/Layout/Layout"));
// const MyRatesMovies = React.lazy(() => import("../pages/MyRatesMovies/MyRatesMovies"));
// const WishMovies = React.lazy(() => import('../pages/WishMovies/WishMovies'));
// const LoginPage = React.lazy(() => import(../pages/LoginPage/LoginPage"));

export const appRoutes: Array<IRoute> = [
    {
        path: 'login',
        exact: true,
        element: <LoginPage />,
        requireAuth: false,
        name: 'Авторизация',
    },
    {
        path: 'Registration',
        exact: true,
        element: <LoginPage />,
        requireAuth: false,
        name: 'Авторизация',
    },
    {
        path: '/',
        requireAuth: false,
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <RandomMovies />,
                name: 'Случайные фильмы',
            },
            {
                path: '/movie/',
                requireAuth: false,
                name: 'Фильм',
                children: [
                    {
                        path: ':movieId',
                        element: <MoviePage />,
                        name: '',
                    },
                ],
            },
            {
                path: '/staff/',
                requireAuth: false,
                name: 'Участники',
                children: [
                    {
                        path: ':staffId',
                        element: '',
                        name: '',
                    },
                ],
            },
            {
                path: '/search/',
                requireAuth: false,
                element: <SearchPage />,
                name: 'Поиск',
                children: [
                    {
                        path: ':q',
                        element: <SearchPage />,
                        name: '',
                    },
                ],
            },
            {
                path: 'rates',
                requireAuth: true,
                element: <MyRatesMovies />,
                name: 'Оцененные фильмы',
            },
            {
                path: 'wishes',
                requireAuth: true,
                element: <WishMovies />,
                name: 'Посмотреть позже',
            },
            {
                path: 'top',
                element: '',
                name: 'Популярные',
            },
            {
                path: 'popular',
                element: '',
                name: 'Популярные',
            },
            {
                path: '*',
                element: '',
                name: 'Не найдено',
            },
        ],
    },
    {
        path: 'logout',
        element: <LogoutPage />,
        name: 'Выход',
    },
];
