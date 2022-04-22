import React, { FC, useMemo } from 'react';
import HeartLoading from 'components/utils/HeartLoading/HeartLoading';
import { useLocation } from 'react-router';
import { useGetMyRatesMoviesQuery, useGetWishMoviesQuery } from 'api/BaseApi';
import Row from 'components/utils/Row/Row';
import { IMovieData } from 'types/movies';
import { Link } from 'react-router-dom';
import styles from './WishMovies.module.css';
import Section from '../../components/utils/Section/Section';
import Margin from '../../components/utils/Margin/Margin';
import H from '../../components/utils/H/H';
import HeartLoadingSmall from '../../components/utils/HeartLoading/HeartLoadingSmall';
import StaticTable from '../../components/tables/StaticTable/StaticTable';
import { formatDate } from '../../helpers/formatHelper';
import { IGetMyRatesMovies } from '../../types/api';
import LoadBackground from '../../components/utils/LoadBackground/LoadBackground';

const WishMovies:FC = () => {
    const location = useLocation();
    const { data, isLoading } = useGetWishMoviesQuery(location?.key);

    const commonValuesMl = useMemo(() => (data ? (data as IGetMyRatesMovies[])?.map(({ id, movie, updateDate, rate }) => ({
        col1: movie.content.data,
        col2: movie.content.data.year,
        col3: movie.content.rating.ratingImdb,
        col4: formatDate(updateDate),
    })) : []), [data]);

    const commonColumnMl = useMemo(() => [
        {
            Header: 'Фильм',
            accessor: 'col1' as const,
            Cell: ({ value }: {value: IMovieData}) => (
                <Link to={`/movie/${value.filmId}`}>
                    <Row justifyContent="flex-start" alignItems="flex-start">
                        <div className={styles.movieImage}>
                            <LoadBackground width="60px" height="100px" poster={value.posterUrlPreview} />
                        </div>
                        <div className={styles.movieInformation}>
                            <div className={styles.movieTitle}>{value.nameRu}</div>
                            <div className={styles.movieGenres}>
                                <p>{value.genres?.map((item) => item.genre).join(', ')}</p>
                            </div>
                        </div>
                    </Row>
                </Link>

            ),
        },
        {
            Header: 'Год',
            accessor: 'col2' as const,
        },
        {
            Header: 'Рейтинг',
            accessor: 'col3' as const,
        },
        {
            Header: 'Дата оценки',
            accessor: 'col4' as const,
        },
    ], [data]);

    return (
        <div className={styles.container}>
            <HeartLoading load={!isLoading}>
                <Section className={styles.wrapper}>
                    <div className={styles.scroll}>
                        <Margin margin="0 0 16px 0">
                            <H size="m">Посмотреть позже</H>
                        </Margin>
                        {
                            isLoading
                                ? (
                                    <div className={styles.loading}>
                                        <HeartLoadingSmall size="50px" />
                                    </div>
                                )
                                : (
                                    <StaticTable
                                        initialState={{
                                            sortBy: [
                                                {
                                                    id: 'col4',
                                                    desc: true,
                                                },
                                            ],
                                        }}
                                        columns={commonColumnMl}
                                        data={commonValuesMl}
                                    />
                                )
                        }
                    </div>
                </Section>
            </HeartLoading>
        </div>
    );
};

export default WishMovies;
