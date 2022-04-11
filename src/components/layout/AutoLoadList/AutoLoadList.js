import React, { useEffect, useState } from 'react';
import styles from '@views/RandomMovies/RandomMovies.module.css';
import HeartLoading from '@components/services/HeartLoading/HeartLoading';
import MovieGridItem from '@components/movie/MovieGridItem/MovieGridItem';
import { useDispatch, useSelector } from 'react-redux';
import { resetMovie } from '@store/movies/movies.slice';
import { setPageLoading } from '@store/app/app.slice';

const PopularFilms = ({ loader }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const listFilms = useSelector((state) => state.movies.listFilms);
    const countPage = useSelector((state) => state.movies.countPage);
    const pageLoading = useSelector((state) => state.app.pageLoading);

    useEffect(async () => {
        setPage(1);
        console.log('change loader');
        await dispatch(resetMovie());
        dispatch(setPageLoading(true));
        await loader(page);
        dispatch(setPageLoading(false));
        setLoading(false);
    }, [loader]);

    const onScroll = (e) => {
        const element = e.currentTarget.parentNode;
        if (element.scrollHeight - element.scrollTop === element.clientHeight && !loading && countPage >= page) {
            setLoading(true);
            loader(page + 1).then(() => {
                setLoading(false);
                setPage((prevState) => prevState + 1);
            });
        }
    };

    return (
        <div className={styles.container} onWheel={onScroll}>
            <HeartLoading load={!pageLoading}>
                {
                    listFilms?.length ? listFilms?.map((item, index) => (
                        <MovieGridItem
                            delay={index * 10}
                            key={index}
                            id={item.filmId}
                            name={item.nameRu}
                            poster={item.posterUrlPreview}
                            genres={item.genres}
                            year={item.year}
                            ratingFilm={item.rating}
                        />
                    )) : null
                }
            </HeartLoading>
        </div>
    );
};

export default PopularFilms;
