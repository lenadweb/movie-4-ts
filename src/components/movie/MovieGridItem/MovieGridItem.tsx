import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { easeQuadInOut } from 'd3-ease';
import cn from 'classnames';
import LoadBackground from 'components/utils/LoadBackground/LoadBackground';
import AnimatedProgressProvider from 'components/utils/AnimatedProgressProvider/AnimatedProgressProvider';
import Rating from 'components/movie/Rating/Rating';
import Display from 'components/utils/Display/Display';
import styles from './MovieGridItem.module.css';

interface IMovieGridItem {
    id: number;
    poster: string;
    name: string;
    genres: Array<{ genre: string }>;
    year: number;
    ratingFilm: number;
    delay: number;

}

const MovieGridItem:FC<IMovieGridItem> = ({ id, poster, name, genres, year, ratingFilm, delay }) => {
    const [animDurBorderGradient, setAnimDurBorderGradient] = useState(Math.round(Math.random() * 2800 + 2000));

    return (
        <Link
            to={`/movie/${id}`}
            className={styles.movieItem}
            style={{
                animationDelay: `${delay}ms`,
            }}
        >
            <div
                className={styles.borderGradient}
                style={{
                // backgroundSize: `${bgSizeBorderGradient}%`,
                    animationDuration: `${animDurBorderGradient}ms`,
                }}
            />
            <div className={cn(styles.movieContainer)}>
                <div className={styles.movieImage}>
                    <LoadBackground poster={poster} />
                </div>
                <div className={styles.movieInformation}>
                    <div className={styles.movieTitle}>{name}</div>
                    <Display show={!!genres?.length}>
                        <div className={styles.movieGenres}>
                            <p>{genres?.map(({ genre }) => genre).join(', ')}</p>
                        </div>
                    </Display>
                    <div className={styles.movieRelease}>{year}</div>
                    <Display show={!!ratingFilm}>
                        <div className={styles.movieRating}>
                            <AnimatedProgressProvider
                                valueStart={30}
                                valueEnd={ratingFilm * 10}
                                duration={1}
                                easingFunction={easeQuadInOut}
                            >
                                {(value: number) => {
                                    const roundedValue = Math.round(value);
                                    const colors = `rgba(${255 - 255 * (roundedValue / 100)},${255 * (roundedValue / 100)},0, 0.8)`;
                                    return <Rating color={colors} rating={roundedValue} />;
                                }}
                            </AnimatedProgressProvider>
                        </div>
                    </Display>
                </div>
            </div>
        </Link>
    );
};

export default MovieGridItem;
