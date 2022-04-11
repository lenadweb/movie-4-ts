import React, { ChangeEvent, FC, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpacityFade from 'components/utils/OpacityFade/OpacityFade';
import HeartLoadingSmall from 'components/utils/HeartLoading/HeartLoadingSmall';
import MovieListItem from 'components/movie/MovieListItem/MovieListItem';
import BlurFade from 'components/utils/BlurFade/BlurFade';
import useWindowSize from 'hooks/useWindowSize';
import Display from 'components/utils/Display/Display';
import { useGetMoviesMutation } from 'api/KpApi';
import styles from './QuickSearch.module.css';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

const QuickSearch:FC = () => {
    const dispatch = useDispatch();
    const searchInput = useRef(null);
    const resultContainer = useRef(null);
    const { width } = useWindowSize();
    const [inputValue, setInputValue] = useState('');
    const [visibleResult, setVisibleResult] = useState(false);
    const ref = useRef(null);
    const [getMovies, { isLoading, data: searchResult }] = useGetMoviesMutation();
    useOutsideClick(ref, () => setVisibleResult(false));
    const timer = useRef<any>();

    const changeSearchHandler = (e:ChangeEvent<HTMLInputElement>):void => {
        setInputValue(e.target.value);
    };

    const onFocusHandler = ():void => {
        setVisibleResult(true);
    };

    const onEnterHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            // history.push(`/search/${inputValue}`);
            setInputValue('');
            setVisibleResult(false);
        }
    };

    useEffect(() => {
        if (inputValue.length && width > 768) {
            timer.current = setTimeout(async () => {
                const result = await getMovies({
                    keyword: inputValue,
                    page: 1,
                });
                setVisibleResult(true);
            }, 500);
        } else {
            setVisibleResult(false);
        }

        return () => {
            clearTimeout(timer.current);
        };
    }, [inputValue]);

    return (
        <div className={styles.wrapper} ref={ref}>
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={changeSearchHandler}
                        onKeyDown={onEnterHandler}
                        placeholder="Поиск по сайту"
                        ref={searchInput}
                        onFocus={onFocusHandler}
                    />
                    <OpacityFade show={isLoading && width > 768}>
                        <HeartLoadingSmall size="20px" className={styles.loading} />
                    </OpacityFade>
                </div>
            </form>
            {/* <BlurFade show={resultShow && inputValue.length}> */}
            {/*    <Blur className={styles.blur} /> */}
            {/* </BlurFade> */}
            <Display show={width > 768}>
                <OpacityFade show={!isLoading && visibleResult && !!inputValue.length}>
                    {searchResult?.films?.length
                        ? (
                            <div className={styles.resultHolder}>
                                {searchResult?.films?.slice(0, 9).map((item: any, index: number) => (
                                    <MovieListItem
                                        delay={(index * 30)}
                                        key={item.filmId}
                                        id={item.filmId}
                                        name={item.nameRu}
                                        poster={item.posterUrlPreview}
                                        genres={item.genres}
                                        year={item.year}
                                        ratingFilm={item.rating}
                                        onClick={() => setVisibleResult(false)}
                                    />
                                ))}
                            </div>
                        )
                        : searchResult?.films?.length === 0 && (
                            <div className={styles.resultHolder}>
                                <h6 className={styles.resultSearchEmptyResults}>Ничего не найдено</h6>
                            </div>
                        )}
                </OpacityFade>
            </Display>
        </div>
    );
};

export default QuickSearch;
