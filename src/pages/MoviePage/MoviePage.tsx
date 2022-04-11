import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadBackground from 'components/utils/LoadBackground/LoadBackground';
import HeartLoading from 'components/utils/HeartLoading/HeartLoading';
import { movieTypes } from 'constants/movie';
import Attribute from 'components/movie/Attribute/Attribute';
import { formatNumberThousand } from 'helpers/formatHelper';
import CircleButton from 'components/forms/Buttons/CircleButton/CircleButton';
import Actors from 'components/movie/Actors/Actors';
import PrimaryButton from 'components/forms/Buttons/PrimaryButton/PrimaryButton';
import OpacityFade from 'components/utils/OpacityFade/OpacityFade';
import RatingDetails from 'components/movie/RatingDetails/RatingDetails';
import Section from 'components/utils/Section/Section';
import HorizontalSlides from 'components/utils/HorizontalSlides/HorizontalSlides';
import H from 'components/utils/H/H';
import Margin from 'components/utils/Margin/Margin';
import Display from 'components/utils/Display/Display';
import MovieCompactItem from 'components/movie/MovieCompactItem/MovieCompactItem';
import WatchMovie from 'components/movie/WatchMovie/WatchMovie';
import Portal from 'components/utils/Portal/Portal';

import shareIcon from 'assets/images/share.svg';
import favoriteIcon from 'assets/images/favorite.svg';
import {
    useGetMovieInformationQuery,
    useGetMovieStaffQuery,
    useGetMovieTrailersQuery, useGetPrequelsQuery,
    useGetSimilarMoviesQuery,
} from 'api/KpApi';
import styles from './MoviePage.module.css';
import { selectPageLoading, setPageLoading } from '../../redux/reducers/AppSlice';
import { selectMovieInformation, selectPending, selectPrequels, selectSimilar, selectStaff } from '../../redux/reducers/MoviesSlice';
import SimilarFilms from '../../components/movie/SimilarFilms/SimilarFilms';
import Prequels from '../../components/movie/Prequels/Prequels';

const MoviePage:FC = () => {
    const [watch, setWatch] = useState(false);
    const params = useParams();
    const { data: movieInformation } = useGetMovieInformationQuery(params.movieId);
    const { data: trailers } = useGetMovieTrailersQuery(params.movieId);
    const { data: staff } = useGetMovieStaffQuery(params.movieId);
    const [showTorrents, setShowTorrents] = useState(false);
    const dispatch = useDispatch();
    const pageLoading = useSelector(selectPending([
        'getMovieStaff',
        'getMovieInformation',
        'getTrailers',
    ]));
    const director = staff?.find((item:any) => item?.professionKey === 'DIRECTOR');
    const actors = staff?.filter((item:any) => item?.professionKey === 'ACTOR').slice(0, 6);

    useEffect(() => {
        console.log(pageLoading);
    }, [pageLoading]);

    useEffect(() => {
        dispatch(setPageLoading(true));
    }, [params.movieId]);

    // useEffect(() => {
    //     movieInformation?.data && dispatch(setTitle(movieInformation.nameRu));
    // }, [movieInformation?.nameRu]);

    const onBtnWatchClick = (e: KeyboardEvent):void => {
        if (e.ctrlKey || e.metaKey) {
            const win:any = window.open(`https://lenad.site/films/${params.movieId}?name=${movieInformation?.data?.nameRu}`, '_blank');
            win.focus();
        } else setWatch(true);
    };

    const attributes = [
        director
            ? (
                <Attribute
                    key={1}
                    caption="Режиссер"
                    content={<Link to={`/staff/${director.staffId}`}>{director.nameRu}</Link>}
                />
            ) : null,
        movieInformation?.data?.countries?.length
            ? (
                <Attribute
                    key={2}
                    caption={movieInformation.countries.length > 1 ? 'Страны' : 'Страна'}
                    content={movieInformation.countries.map((item: any) => item.country).join(', ')}
                />
            ) : null,
        movieInformation?.budget?.budget
            ? (
                <Attribute
                    key={3}
                    caption="Бюджет"
                    content={`$${formatNumberThousand(parseInt(movieInformation.budget.budget.replace(/\D+/g, ''), 10))}`}
                />
            ) : null,
        movieInformation?.budget?.grossWorld
            ? (
                <Attribute
                    key={4}
                    caption="Сборы"
                    content={`$${formatNumberThousand(parseInt(movieInformation.budget.grossWorld, 10))}`}
                />
            ) : null,
    ];

    return (
        <HeartLoading load={!pageLoading}>
            <OpacityFade show={!pageLoading}>
                <Section>
                    <div
                        className={styles.bgWrapper}
                        style={{
                            backgroundImage: `url(${movieInformation?.posterUrl})`,
                        }}
                    />
                    {movieInformation && (
                        <div className={styles.informationInner}>
                            <div className={styles.poster}>
                                <LoadBackground poster={movieInformation.posterUrl} />
                            </div>
                            <div className={styles.movieInformation}>
                                <div className={styles.movieTypeContainer}>
                                    <div className={styles.movieType}>
                                        {
                                            // @ts-ignore
                                            movieTypes[movieInformation.type]
                                        }
                                    </div>
                                    <div className={styles.movieGenres}>
                                        {movieInformation.genres.map((item:any) => item.genre).join(', ')}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div>
                                        <div className={styles.movieTitle}>
                                            <span className={styles.bold}>{movieInformation.nameRu}</span>
                                            <span>
                                                {' '}
                                                (
                                                {movieInformation.year}
                                                )
                                            </span>
                                        </div>
                                        {attributes}
                                    </div>
                                    <Display show={movieInformation.ratingImdb}>
                                        <div className={styles.movieRatingContainer}>
                                            <RatingDetails rating={movieInformation} />
                                        </div>
                                    </Display>
                                </div>
                                <Display show={movieInformation.description}>
                                    <div className={styles.movieDescription}>{movieInformation.description}</div>
                                </Display>
                                <div className={styles.movieButtons}>
                                    <CircleButton
                                        icon={favoriteIcon}
                                        onClick={() => {
                                            console.log('kke');
                                        }}
                                    />
                                    <CircleButton
                                        icon={shareIcon}
                                        onClick={() => {
                                            console.log('kke');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <Display show={actors?.length}>
                        <div className={styles.actorsContainer}>
                            <div className={styles.movieActors}>
                                <Actors actors={actors} />
                            </div>
                            <span>
                                <PrimaryButton
                                    className={styles.btnWatch}
                                    caption="Смотреть"
                                    onClick={onBtnWatchClick}
                                />
                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                <div
                                    className={styles.btnTorrents}
                                    onClick={() => setShowTorrents(true)}
                                >
                                    Скачать торрент
                                </div>
                            </span>
                        </div>
                    </Display>
                    <div>
                        {/* <Trailers trailers={trailers}/> */}
                    </div>
                </Section>
                <SimilarFilms movieId={params.movieId || ''} />
                <Prequels movieId={params.movieId || ''} />
            </OpacityFade>
            <Portal>
                <OpacityFade show={watch}>
                    <WatchMovie movieId={parseInt((params.movieId as string), 10)} onClose={() => setWatch(false)} />
                </OpacityFade>
            </Portal>
            {/* <Portal> */}
            {/*    <OpacityFade show={showTorrents}> */}
            {/*        <Torrents movieInformation={movieInformation} onClose={() => setShowTorrents(false)} /> */}
            {/*    </OpacityFade> */}
            {/* </Portal> */}
        </HeartLoading>
    );
};

export default MoviePage;