import randomIcon from 'assets/images/dice.svg';
import searchIcon from 'assets/images/search.svg';
import topIcon from 'assets/images/ranking.svg';
import popularIcon from 'assets/images/burn.svg';
import releasesIcon from 'assets/images/cinema-roll.svg';
import settingsIcon from 'assets/images/settings.svg';
import rateIcon from 'assets/images/rate.svg';
import quizIcon from 'assets/images/puzzle.svg';
import { INavigationItem } from '../types/navigation';

export const navigationItems: Array<INavigationItem> = [
    {
        id: 0,
        name: 'Random',
        nameRu: 'Случайные',
        link: '',
        img: randomIcon,
    },
    {
        id: 1,
        name: 'Search',
        nameRu: 'Поиск',
        link: 'search',
        img: searchIcon,
    },
    {
        id: 4,
        name: 'My rates',
        nameRu: 'Мои оценки',
        link: 'rates',
        img: rateIcon,
    },
    {
        id: 6,
        name: 'Watch later',
        nameRu: 'Отложенные',
        link: 'wishes',
        img: releasesIcon,
    },
    {
        id: 2,
        name: 'Top',
        nameRu: 'Лучшие',
        link: 'top',
        img: topIcon,
    },
    {
        id: 3,
        name: 'Popular',
        nameRu: 'Популярные',
        link: 'popular',
        img: popularIcon,
    },
    {
        id: 5,
        name: 'Settings',
        nameRu: 'Настройки',
        link: 'settings',
        img: settingsIcon,
    },
    // {
    //     id: 5,
    //     name: 'Quiz',
    //     nameRu: 'Викторина',
    //     link: 'quiz',
    //     img: quizIcon,
    // },
];
