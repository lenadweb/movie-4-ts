import React, { FC, useState } from 'react';
import cn from 'classnames';
import { formatNumberThousand } from 'helpers/formatHelper';
import Display from 'components/utils/Display/Display';
import styles from './RatingDetails.module.css';

const RatingDetails:FC<{rating: any}> = ({ rating }) => {
    const [starNumber, setStarNumber] = useState<number>(0);

    const onClickHandler = (starCount: number): void => {
        setStarNumber(starCount);
    };

    const stars = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/control-has-associated-label,jsx-a11y/interactive-supports-focus
        stars.push(<div
            className={cn(styles.star, {
                [styles.starActive]: starNumber - 1 >= i,
            })}
            role="button"
            onClick={() => onClickHandler(i + 1)}
        />);
    }

    return (
        <div className={styles.container}>
            {/* <div className={styles.kinopoisk}> */}
            {/*    <span>Кинопоиск:</span> */}
            {/*    <span> {rating.rating}</span> */}
            {/* </div> */}
            {/* <div className={styles.imdb}> */}
            {/*    <span> {rating.ratingImdb}</span> */}
            {/* </div> */}
            <div className={styles.ratingWrapper}>
                <div className={styles.rating}>
                    {rating.ratingImdb}
                </div>
                <div className={styles.ratingExtraInformation}>
                    <div className={styles.maxRating}>/10</div>
                    <div className={styles.voteCount}>{formatNumberThousand(rating.ratingVoteCount)}</div>
                </div>
                <Display show={rating.ratingFilmCritics && rating.ratingFilmCritics !== 'null'}>
                    <div className={styles.critics}>
                        <div className={styles.criticsRating}>{rating.ratingFilmCritics}</div>
                        <div>Оценка критиков</div>
                    </div>
                </Display>
            </div>
            <div className={styles.starContainer}>
                {stars}
            </div>
        </div>
    );
};

export default RatingDetails;
