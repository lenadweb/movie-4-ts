import React, { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import LoadBackground from 'components/utils/LoadBackground/LoadBackground';
import Rating from 'components/movie/Rating/Rating';
import Display from 'components/utils/Display/Display';
import styles from './MovieListItem.module.css';

interface IMovieListItem {
    id: number;
    poster: string;
    name: string;
    genres: Array<string>;
    onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
    year: string;
    ratingFilm: string | number;
    delay: number;
}
const MovieListItem:FC<IMovieListItem> = ({ id, poster, name, genres, year, ratingFilm, delay, onClick }) => {
    const roundedValue: any = (ratingFilm as string)?.indexOf('%') === -1 ? (ratingFilm as number) * 10 : ratingFilm && parseFloat((ratingFilm as string)?.slice(0, -1));
    const colors = `rgba(${255 - 255 * (roundedValue / 100)},${255 * (roundedValue / 100)},0, 0.8)`;
    return (
        <Link
            to={`/movie/${id}`}
            className={styles.movieItem}
            onClick={onClick}
            style={{
                animationDelay: `${delay}ms`,
            }}
        >
            <div
                className={styles.borderGradient}
                style={{
                // backgroundSize: `${bgSizeBorderGradient}%`,
                // animationDuration: `${animDurBorderGradient}ms`
                }}
            />
            <div className={cn(styles.movieContainer)}>
                <div className={styles.movieImage}>
                    <LoadBackground poster={poster} height="80px" width="60px" />
                </div>
                <div className={styles.movieInformation}>
                    <div className={styles.movieTitle}>{name}</div>
                    <Display show={!!genres}>
                        <div className={styles.movieGenres}>
                            <p>{genres?.slice(0, 2).map((item: any) => item.genre).join(', ')}</p>
                        </div>
                    </Display>
                    <div className={styles.movieRelease}>{year}</div>
                    <Display show={!!ratingFilm && ratingFilm !== 'null'}>
                        <div className={styles.movieRating}>
                            <Rating color={colors} rating={roundedValue} width="32px" height="32px" />
                        </div>
                    </Display>
                </div>
            </div>
        </Link>
    );
};

export default MovieListItem;
