import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AutoLoadList.module.css';
import { selectPageLoading, setPageLoading } from '../../../redux/reducers/AppSlice';
import HeartLoading from '../../utils/HeartLoading/HeartLoading';
import MovieGridItem from '../../movie/MovieGridItem/MovieGridItem';
import { selectCountPage, selectListFilms } from '../../../redux/reducers/MoviesSlice';
import HorizontalLoading from '../../utils/HorizontalLoading/HorizontalLoading';
import OpacityFade from '../../utils/OpacityFade/OpacityFade';
import useDebounce from '../../../hooks/useDebounce';

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
    const [scrollHeight, setScrollHeight] = useState(0);
    const debounceScroll = useDebounce(onScrollEnd, 100);
    const ref = useRef();

    const onScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        console.log('Scroll');
        const element = e.currentTarget?.parentElement;
        // debugger;
        console.log({
            scrollHeight: element?.scrollHeight,
            stateScrollHeight: scrollHeight,
        });
        if (element && element.scrollHeight > scrollHeight && (element.scrollHeight - element.scrollTop === element.clientHeight && countPage >= page)) {
            debounceScroll(page + 1);
            setScrollHeight(element.scrollHeight);
        }
    };

    return (
        <div className={className} onScroll={onScroll}>
            <HeartLoading load={!pageLoading}>
                {
                    listFilms?.length ? listFilms?.map((item, index) => (
                        <MovieGridItem
                            delay={((index + 1) % 20) * 50}
                            key={index}
                            id={item.kinopoiskId || (item as any).filmId}
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
