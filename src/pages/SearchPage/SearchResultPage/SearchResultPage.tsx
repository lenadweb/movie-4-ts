import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AutoLoadList from '../../../components/layout/AutoLoadList/AutoLoadList';
import styles from './SearchResultPage.module.css';
import { useGetMoviesMutation } from '../../../api/KpApi';
import { selectListFilms, setCountPage, setListFilms } from '../../../redux/reducers/MoviesSlice';
import { setPageLoading } from '../../../redux/reducers/AppSlice';

const SearchResultPage:FC = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const listFilms = useSelector(selectListFilms);
    const params = useParams();
    const [searchByKeyword, { data, isLoading: resultLoading }] = useGetMoviesMutation();

    const onScrollEnd = async (nPage: number): Promise<void> => {
        setPage(nPage);
    };

    useEffect(() => {
        if (page !== 1) {
            searchByKeyword({
                keyword: params.q,
                page,
            });
        }
    }, [page]);

    useEffect(() => {
        (async () => {
            setPage(1);
            dispatch(setListFilms([]));
            dispatch(setPageLoading(true));
            await searchByKeyword({
                keyword: params.q,
                page: 1,
            });
            dispatch(setPageLoading(false));
        })();
    }, [params.q]);

    useEffect(() => {
        if (data?.films?.length) {
            dispatch(setCountPage(data.pagesCount));
            dispatch(setListFilms([
                ...listFilms,
                ...data.films,
            ]));
        }
    }, [data]);

    return (
        <div className={styles.wrapper}>
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

export default SearchResultPage;
