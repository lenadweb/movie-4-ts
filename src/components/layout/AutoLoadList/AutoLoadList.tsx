import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AutoLoadList.module.css';
import { selectPageLoading, setPageLoading } from '../../../redux/reducers/AppSlice';
import HeartLoading from '../../utils/HeartLoading/HeartLoading';
import MovieGridItem from '../../movie/MovieGridItem/MovieGridItem';
import { selectCountPage, selectListFilms } from '../../../redux/reducers/MoviesSlice';
import HorizontalLoading from '../../utils/HorizontalLoading/HorizontalLoading';
import OpacityFade from '../../utils/OpacityFade/OpacityFade';

interface AutoLoadList {
    onScrollEnd: (page: number) => void,
    className?: string;
    loading?: boolean;
    page?: number;
}

const AutoLoadList: FC<AutoLoadList> = ({ onScrollEnd, className = '', loading = false, page = 1 }) => {
    const dispatch = useDispatch();
    const listFilms = useSelector(selectListFilms);
    const countPage = useSelector(selectCountPage);
    const pageLoading = useSelector(selectPageLoading);

    const onScroll = async (e: React.UIEvent<HTMLDivElement>): Promise<void> => {
        const element = e.currentTarget?.parentElement;
        // eslint-disable-next-line no-unsafe-optional-chaining,no-debugger
        // debugger;
        if (element && (element.scrollHeight - element.scrollTop === element.clientHeight && !loading && countPage >= page)) {
            onScrollEnd(page + 1);
        }
    };

    return (
        <div className={className} onWheel={onScroll}>
            <HeartLoading load={!pageLoading}>
                {
                    listFilms?.length ? listFilms?.map((item, index) => (
                        <MovieGridItem
                            delay={((index + 1) % 20) * 50}
                            key={index}
                            id={item.kinopoiskId}
                            name={item.nameRu}
                            poster={item.posterUrlPreview}
                            genres={item.genres}
                            year={item?.year}
                            ratingFilm={item.ratingKinopoisk}
                        />
                    )) : null
                }
                <OpacityFade show={loading}>
                    <HorizontalLoading />
                </OpacityFade>
            </HeartLoading>
        </div>

    );
};

export default AutoLoadList;
