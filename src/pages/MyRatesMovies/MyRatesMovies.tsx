import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeartLoading from 'components/utils/HeartLoading/HeartLoading';
import MovieGridItem from 'components/movie/MovieGridItem/MovieGridItem';
import { useGetRandomMoviesQuery } from 'api/KpApi';
import { useLocation } from 'react-router';
import { useGetMyRatesMoviesQuery } from 'api/BaseApi';
import prettyBytes from 'pretty-bytes';
import Row from 'components/utils/Row/Row';
import { IMovieData } from 'types/movies';
import { Link } from 'react-router-dom';
import styles from './MyRatesMovies.module.css';
import { selectListFilms } from '../../redux/reducers/MoviesSlice';
import { selectPageLoading } from '../../redux/reducers/AppSlice';
import Section from '../../components/utils/Section/Section';
import Margin from '../../components/utils/Margin/Margin';
import H from '../../components/utils/H/H';
import HeartLoadingSmall from '../../components/utils/HeartLoading/HeartLoadingSmall';
import StaticTable from '../../components/tables/StaticTable/StaticTable';
import { formatDate, formatNumberThousand } from '../../helpers/formatHelper';
import LoadingSpinner from '../../components/utils/LoadingSpinner/LoadingSpinner';
import Icon from '../../components/media/Icon/Icon';
import downloadIcon from '../../assets/images/download.svg';
import { IGetMyRatesMovies } from '../../types/api';
import LoadBackground from '../../components/utils/LoadBackground/LoadBackground';
import Display from '../../components/utils/Display/Display';
import HoverToolTip from '../../components/utils/HoverToolTip/HoverToolTip';

const MyRatesMovies:FC = () => {
    const location = useLocation();
    const { data, isLoading } = useGetMyRatesMoviesQuery(location?.key);

    const commonValuesMl = useMemo(() => (data ? (data as IGetMyRatesMovies[])?.map(({ id, movie, updateDate, rate }) => ({
        col1: movie.content.data,
        col2: movie.content.data.year,
        col3: rate,
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
            Header: 'Моя оценка',
            accessor: 'col3' as const,
            Cell: ({ value }:any) => (
                <HoverToolTip content={value}>
                    <Row justifyContent="flex-start" alignItems="flex-start">
                        {
                            Array.from({ length: value }).map(() => <div className={styles.star} />)
                        }
                    </Row>
                </HoverToolTip>
            ),
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
                            <H size="m">Оцененные</H>
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

export default MyRatesMovies;
