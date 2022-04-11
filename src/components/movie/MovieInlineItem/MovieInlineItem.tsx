import React, { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './MovieInlineItem.module.css';

interface IMovieGridItem {
    id: number;
    name: string;
    ratingFilm: string | number;
    onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
    delay: number;
}

const MovieInlineItem:FC<IMovieGridItem> = ({ id, name, ratingFilm, delay, onClick }) => (
    <Link
        to={`/movie/${id}`}
        className={styles.container}
        onClick={onClick}
        style={{
            animationDelay: `${delay}ms`,
        }}
    >
        <div className={styles.inner}>
            <div>{name}</div>
            <div>{ratingFilm}</div>
        </div>
    </Link>
);

export default MovieInlineItem;
