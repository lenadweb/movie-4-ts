import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import LoadBackground from 'components/utils/LoadBackground/LoadBackground';
import styles from './MovieCompactItem.module.css';

interface IMovieCompactItem {
    id: number;
    poster: string;
    name: string;
    delay: number;
    onClick?: () => void
}

const MovieCompactItem:FC<IMovieCompactItem> = ({ id, poster, name, delay, onClick }) => (
    <Link
        to={`/movie/${id}`}
        className={styles.movieItem}
        onClick={onClick}
        style={{
            animationDelay: `${delay}ms`,
        }}
    >
        <div className={cn(styles.movieContainer)}>
            <div className={styles.movieImage}>
                <LoadBackground poster={poster} height="140px" width="100px" />
            </div>
            <div className={styles.movieInformation}>
                <div>{name}</div>
            </div>
        </div>
    </Link>
);

export default MovieCompactItem;
