import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeartLoading from 'components/utils/HeartLoading/HeartLoading';
import MovieGridItem from 'components/movie/MovieGridItem/MovieGridItem';
import { useGetRandomMoviesQuery } from 'api/KpApi';
import { useLocation } from 'react-router';
import styles from './RandomMovies.module.css';
import { selectListFilms } from '../../redux/reducers/MoviesSlice';
import { selectPageLoading } from '../../redux/reducers/AppSlice';

const RandomMovies:FC = () => {
    const location = useLocation();
    useGetRandomMoviesQuery(location?.key);
    const listFilms = useSelector(selectListFilms);
    const pageLoading = useSelector((selectPageLoading));

    return (
        <div className={styles.container}>
            <HeartLoading load={!pageLoading}>
                {
                    listFilms?.length && listFilms.slice(0, 12).map((item, index) => (
                        <MovieGridItem
                            delay={index * 30}
                            key={item.kinopoiskId}
                            id={item.kinopoiskId}
                            name={item.nameRu}
                            poster={item.posterUrlPreview}
                            genres={item.genres}
                            year={item.year}
                            ratingFilm={(item.ratingImdb)}
                        />
                    ))
                }
            </HeartLoading>
        </div>
    );
};

export default RandomMovies;
