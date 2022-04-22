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
import spinnerIcon from 'assets/images/spinner.svg';
import {
    useGetMovieInformationQuery,
    useGetMovieStaffQuery,
    useGetMovieTrailersQuery,
} from 'api/KpApi';
import cn from 'classnames';
import styles from './MoviePage.module.css';
import SimilarFilms from '../../components/movie/SimilarFilms/SimilarFilms';
import Prequels from '../../components/movie/Prequels/Prequels';
import { useGetMovieStateQuery, useSetRatingMutation, useSetWishMovieMutation } from '../../api/BaseApi';
import { selectUser } from '../../redux/reducers/UserSlice';
import Torrents from '../../components/movie/Torrents/Torrents';
import useAuth from '../../hooks/useAuth';
import TextButton from '../../components/forms/Buttons/TextButton/TextButton';
import HoverToolTip from '../../components/utils/HoverToolTip/HoverToolTip';
import LoadingSpinner from '../../components/utils/LoadingSpinner/LoadingSpinner';
import useToast from '../../hooks/useToast';
import { requireAuth } from '../../helpers/toastHelper';

const MoviePage:FC = () => {
    const [watch, setWatch] = useState(false);
    const params = useParams();
    const isAuth = useAuth();
    const { id: myUserId } = useSelector(selectUser);
    const { data: movieInformation, isLoading: isLoadingMovieInformation } = useGetMovieInformationQuery(params.movieId);
    const [setRating, { isLoading: isLoadingSetRating }] = useSetRatingMutation();
    const [setWishMovie, { isLoading: isLoadingWishToggle }] = useSetWishMovieMutation();
    const { data: trailers } = useGetMovieTrailersQuery(params.movieId);
    const { data: staff, isLoading: isLoadingStaff } = useGetMovieStaffQuery(params.movieId);
    const { data: movieUserState, isLoading: isLoadingMovieUserState } = useGetMovieStateQuery(params.movieId || '', {
        skip: !isAuth,
    });
    const rating = movieUserState?.rates || [];
    const myRate = rating.find(({ user }) => user.id === myUserId)?.rate || 0;
    // eslint-disable-next-line no-debugger
    const pageLoading = isLoadingMovieInformation || isLoadingStaff;
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

    const onWishToggle = ():void => {
        if ((!isLoadingMovieUserState && !isLoadingWishToggle)) {
            setWishMovie({
                movieId: movieInformation?.data.filmId,
                value: !movieUserState?.isWish,
                movieContent: movieInformation,
            });
        }
    };

    const attributes = [
        {
            caption: 'Режиссер',
            content: <Link to={`/staff/${director?.staffId}`}>{director?.nameRu}</Link>,
            visibility: !!director,
        },
        {
            caption: movieInformation?.data?.countries.length > 1 ? 'Страны' : 'Страна',
            content: movieInformation?.data?.countries.map(({ country }: any) => country).join(', '),
            visibility: movieInformation?.data?.countries?.length,
        },
        {
            caption: 'Бюджет',
            content: `$${formatNumberThousand(parseInt(movieInformation?.budget?.budget?.replace(/\D+/g, ''), 10))}`,
            visibility: movieInformation?.budget?.budget,
        },
        {
            caption: 'Сборы',
            content: `$${formatNumberThousand(parseInt(movieInformation?.budget?.grossWorld, 10))}`,
            visibility: movieInformation?.budget?.grossWorld,
        },
    ];

    const onChangeRatingHandler = async (rating: number): Promise<void> => {
        if (params.movieId && isAuth) {
            await setRating({
                movieId: params.movieId,
                rating,
                movieContent: movieInformation,
            });
        }
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
                                    {
                                        attributes.map(({ caption, content, visibility }) => (visibility ? <Attribute caption={caption} content={content} /> : null))
                                    }
                                </div>
                                <Display show={movieInformation?.rating.ratingImdb}>
                                    <div className={styles.movieRatingContainer}>
                                        <RatingDetails
                                            onChange={onChangeRatingHandler}
                                            loading={isLoadingMovieUserState}
                                            defaultRating={myRate}
                                            rating={movieInformation.rating}
                                        />
                                    </div>
                                </Display>
                            </div>
                            <Display show={movieInformation.data.description}>
                                <div className={styles.movieDescription}>{movieInformation.data.description}</div>
                            </Display>
                            <div className={styles.movieButtons}>
                                <HoverToolTip content="Посмотреть позже">
                                    <CircleButton
                                        icon={(!isLoadingMovieUserState && !isLoadingWishToggle) ? favoriteIcon : spinnerIcon}
                                        className={cn({
                                            [styles.activeCircleButton]: movieUserState?.isWish,
                                        })}
                                        onClick={requireAuth(onWishToggle)}
                                    />
                                </HoverToolTip>

                                <HoverToolTip content="Поделиться">
                                    <CircleButton
                                        icon={shareIcon}
                                        onClick={() => {
                                            console.log('kke');
                                        }}
                                    />
                                </HoverToolTip>

                            </div>
                        </div>
                    </div>
                )}
                <Display show={actors?.length}>
                    <div className={styles.actorsContainer}>
                        <div className={styles.movieActors}>
                            <Actors actors={actors} />
                        </div>
                        <div className={styles.btnContainer}>
                            <PrimaryButton
                                className={styles.btnWatch}
                                caption="Смотреть"
                                onClick={onBtnWatchClick}
                            />
                            <a href="#torrents">
                                <TextButton
                                    caption="Скачать торрент"
                                    className={styles.btnTorrents}
                                />
                            </a>
                        </div>
                    </div>
                </Display>
                <div>
                    {/* <Trailers trailers={trailers}/> */}
                </div>
            </Section>
            <SimilarFilms movieId={params.movieId || ''} />
            <Prequels movieId={params.movieId || ''} />
            <div id="torrents">
                <Torrents
                    filmId={movieInformation?.data.filmId}
                    request={`${movieInformation?.data.nameRu} ${movieInformation?.data.year}`}
                />
            </div>
            <Portal>
                <OpacityFade show={watch}>
                    <WatchMovie movieId={parseInt((params.movieId as string), 10)} onClose={() => setWatch(false)} />
                </OpacityFade>
            </Portal>
        </HeartLoading>
    );
};

export default MoviePage;
