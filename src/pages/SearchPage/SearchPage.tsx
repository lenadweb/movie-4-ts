import React, { FC, useCallback, useEffect, useState } from 'react';
import { genres as defaultGenres, countries as defaultCountries } from 'constants/filters';
import cn from 'classnames';
import { useSearchByFiltersMutation } from 'api/KpApi';
import { useDispatch } from 'react-redux';
import CheckboxGroup, { CheckboxValue } from '../../components/inputs/CheckboxGroup/CheckboxGroup';
import styles from './SearchPage.module.css';
import H from '../../components/utils/H/H';
import Margin from '../../components/utils/Margin/Margin';
import RangeInput from '../../components/inputs/Range/Range';
import AutoLoadList from '../../components/layout/AutoLoadList/AutoLoadList';
import { setListFilms } from '../../redux/reducers/MoviesSlice';
import { setPageLoading } from '../../redux/reducers/AppSlice';
import useDebounce from '../../hooks/useDebounce';

const SearchPage:FC = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const [genres, setGenres] = useState<Array<CheckboxValue>>(defaultGenres.map(({ genre, id }, index) => ({
        value: id,
        caption: genre,
        isEnable: index === 0,
    })));
    const [years, setYears] = useState<number[]>([1999, 2022]);
    const [rating, setRating] = useState<number[]>([5, 10]);
    const [searchByFilters, { data, isLoading: resultLoading }] = useSearchByFiltersMutation();

    const debounceSearch = useDebounce(searchByFilters, 300);

    useEffect(() => {
        dispatch(setListFilms([]));
        dispatch(setPageLoading(true));
        setPage(1);
        debounceSearch({
            ratingFrom: rating[0],
            ratingTo: rating[1],
            yearFrom: years[0],
            yearTo: years[1],
            genres: genres.filter(({ isEnable }) => isEnable).map(({ value }) => value),
            page: 1,
        });
    }, [genres, years, rating]);

    const onScrollEnd = async (nPage: number): Promise<void> => {
        setPage(nPage);
    };

    useEffect(() => {
        if (page !== 1) {
            searchByFilters({
                ratingFrom: rating[0],
                ratingTo: rating[1],
                yearFrom: years[0],
                yearTo: years[1],
                genres: genres.filter(({ isEnable }) => isEnable).map(({ value }) => value),
                page,
            });
        }
    }, [page]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.filters}>
                <div className={styles.inputItem}>
                    <Margin margin="0 0 8px 0">
                        <H size="m">Год</H>
                    </Margin>
                    <RangeInput
                        disable={false}
                        min={1930}
                        max={2023}
                        value={years}
                        postfix="г."
                        onChange={(value) => setYears(value)}
                    />
                </div>
                <div className={styles.inputItem}>
                    <Margin margin="0 0 8px 0">
                        <H size="m">Рейтинг</H>
                    </Margin>
                    <RangeInput
                        disable={false}
                        min={0}
                        max={10}
                        value={rating}
                        postfix=""
                        onChange={(value) => setRating(value)}
                    />
                </div>
                <div className={cn(styles.inputItem)}>
                    <Margin margin="0 0 8px 0">
                        <H size="m">Жанр</H>
                    </Margin>
                    <div className={styles.checkboxGroup}>
                        <CheckboxGroup values={genres} onChange={setGenres} isMultiple={false} />
                    </div>
                </div>
            </div>
            <div className={styles.result}>
                <AutoLoadList
                    onScrollEnd={onScrollEnd}
                    className={styles.resultGrid}
                    loading={resultLoading}
                    page={page}
                />
            </div>
        </div>
    );
};

export default SearchPage;
