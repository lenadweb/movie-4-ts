import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import Display from 'components/utils/Display/Display';
import WatchMovie from 'components/movie/WatchMovie/WatchMovie';
import Portal from 'components/utils/Portal/Portal';
import shareIcon from 'assets/images/share.svg';
import favoriteIcon from 'assets/images/favorite.svg';
import {
    useGetMovieInformationQuery,
    useGetMovieStaffQuery,
    useGetMovieTrailersQuery,
} from 'api/KpApi';
import StaticTable from 'components/tables/StaticTable/StaticTable';
import styles from './MoviePage.module.css';
import { setPageLoading } from '../../redux/reducers/AppSlice';
import { selectPending } from '../../redux/reducers/MoviesSlice';
import SimilarFilms from '../../components/movie/SimilarFilms/SimilarFilms';
import Prequels from '../../components/movie/Prequels/Prequels';
import { useGetRatingQuery, useSetRatingMutation } from '../../api/BaseApi';
import { selectUser } from '../../redux/reducers/UserSlice';
import Torrents from '../../components/movie/Torrents/Torrents';
import useAuth from '../../hooks/useAuth';

const MoviePage:FC = () => {
    const [watch, setWatch] = useState(false);
    const params = useParams();
    const isAuth = useAuth();
    const { id: myUserId } = useSelector(selectUser);
    const { data: movieInformation } = useGetMovieInformationQuery(params.movieId);
    const { data: rating, isLoading: isLoadingRating } = useGetRatingQuery(params.movieId, {
        skip: !isAuth,
    });
    const [setRating, { isLoading: isLoadingSetRating }] = useSetRatingMutation();
    const { data: trailers } = useGetMovieTrailersQuery(params.movieId);
    const { data: staff } = useGetMovieStaffQuery(params.movieId);
    const dispatch = useDispatch();
    const myRate = (rating as any)?.find(({ user, rate }:{user: any, rate: number}) => user.id === myUserId)?.rate;

    useEffect(() => {
        console.log(movieInformation);
    }, [movieInformation]);

    const pageLoading = useSelector(selectPending([
        'getMovieStaff',
        'getMovieInformation',
        'getTrailers',
    ]));

    const director = staff?.find((item:any) => item?.professionKey === 'DIRECTOR');
    const actors = staff?.filter((item:any) => item?.professionKey === 'ACTOR').slice(0, 6);

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
                    caption={movieInformation.data?.countries.length > 1 ? 'Страны' : 'Страна'}
                    content={movieInformation.data?.countries.map(({ country }: any) => country).join(', ')}
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

    const onChangeRatingHandler = async (rating: number): Promise<void> => {
        const data = await setRating({
            movieId: params.movieId,
            rating,
        });
    };

    return (
        <HeartLoading load={!pageLoading}>
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
                            <LoadBackground poster={movieInformation.data.posterUrl} />
                        </div>
                        <div className={styles.movieInformation}>
                            <div className={styles.movieTypeContainer}>
                                <div className={styles.movieType}>
                                    {
                                        // @ts-ignore
                                        movieTypes[movieInformation.data.type]
                                    }
                                </div>
                                <div className={styles.movieGenres}>
                                    {movieInformation.data.genres.map((item:any) => item.genre).join(', ')}
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div>
                                    <div className={styles.movieTitle}>
                                        <span className={styles.bold}>{movieInformation.data.nameRu}</span>
                                        <span>
                                            {' '}
                                            (
                                            {movieInformation.data.year}
                                            )
                                        </span>
                                    </div>
                                    {attributes}
                                </div>
                                <Display show={movieInformation?.rating.ratingImdb}>
                                    <div className={styles.movieRatingContainer}>
                                        <RatingDetails onChange={onChangeRatingHandler} defaultRating={(myRate as number)} rating={movieInformation.rating} />
                                    </div>
                                </Display>
                            </div>
                            <Display show={movieInformation.data.description}>
                                <div className={styles.movieDescription}>{movieInformation.data.description}</div>
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
                            {/* <div */}
                            {/*    className={styles.btnTorrents} */}
                            {/*    onClick={() => setShowTorrents(true)} */}
                            {/* > */}
                            {/*    Скачать торрент */}
                            {/* </div> */}
                        </span>
                    </div>
                </Display>
                <div>
                    {/* <Trailers trailers={trailers}/> */}
                </div>
            </Section>
            <SimilarFilms movieId={params.movieId || ''} />
            <Prequels movieId={params.movieId || ''} />
            <Torrents
                filmId={movieInformation?.data.filmId}
                request={`${movieInformation?.data.nameRu} ${movieInformation?.data.year}`}
            />
            <Portal>
                <OpacityFade show={watch}>
                    <WatchMovie movieId={parseInt((params.movieId as string), 10)} onClose={() => setWatch(false)} />
                </OpacityFade>
            </Portal>
        </HeartLoading>
    );
};

export default MoviePage;
