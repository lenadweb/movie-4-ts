import React from 'react';
import { IRoute } from 'types/routes';
import Layout from '../components/layout/Layout/Layout';
import RandomMovies from '../pages/RandomMovies/RandomMovies';
import MoviePage from '../pages/MoviePage/MoviePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import LogoutPage from '../pages/LogoutPage/LogoutPage';

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
                name: 'Поиск',
                children: [
                    {
                        path: ':q',
                        element: '',
                        name: '',
                    },
                ],
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
