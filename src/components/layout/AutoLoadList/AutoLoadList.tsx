import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AutoLoadList.module.css';
import { selectPageLoading, setPageLoading } from '../../../redux/reducers/AppSlice';
import HeartLoading from '../../utils/HeartLoading/HeartLoading';
import MovieGridItem from '../../movie/MovieGridItem/MovieGridItem';
import { selectCountPage, selectListFilms } from '../../../redux/reducers/MoviesSlice';

interface AutoLoadList {
    onScrollEnd: (page: number) => void,
    className?: string;
}

const AutoLoadList: FC<AutoLoadList> = ({ onScrollEnd, className = '' }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const listFilms = useSelector(selectListFilms);
    const countPage = useSelector(selectCountPage);
    const pageLoading = useSelector(selectPageLoading);

    useEffect(() => {
        (async () => {
            setPage(1);
            await onScrollEnd(page);
            setLoading(false);
        })();
    }, [onScrollEnd]);

    const onScroll = async (e: React.UIEvent<HTMLDivElement>): Promise<void> => {
        const element = e.currentTarget?.parentElement;
        // eslint-disable-next-line no-unsafe-optional-chaining
        console.log(element && (element?.scrollHeight - element?.scrollTop));
        if (element && (element.scrollHeight - element.scrollTop === element.clientHeight && !loading && countPage >= page)) {
            setLoading(true);
            await onScrollEnd(page + 1);
            setLoading(false);
            setPage((prevState) => prevState + 1);
        }
    };

    return (
        <div className={className} onWheel={onScroll}>
            <HeartLoading load={!pageLoading}>
                {
                    listFilms?.length ? listFilms?.map((item, index) => (
                        <MovieGridItem
                            delay={index * 10}
                            key={item.kinopoiskId}
                            id={item.kinopoiskId}
                            name={item.nameRu}
                            poster={item.posterUrlPreview}
                            genres={item.genres.map(({ genre }) => genre)}
                            year={item?.year?.toString()}
                            ratingFilm={item.ratingKinopoisk}
                        />
                    )) : null
                }
            </HeartLoading>
        </div>
    );
};

export default AutoLoadList;
