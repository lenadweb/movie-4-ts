import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { formatNumberThousand } from 'helpers/formatHelper';
import Display from 'components/utils/Display/Display';
import styles from './RatingDetails.module.css';

interface IRatingDetails {
    rating: any;
    onChange: (rating: number)=>void;
    defaultRating: number;
}

const RatingDetails:FC<IRatingDetails> = ({ rating, onChange, defaultRating = 0 }) => {
    const [starNumber, setStarNumber] = useState<number>(defaultRating);

    const onClickHandler = (starCount: number): void => {
        setStarNumber(starCount);
        onChange(starCount);
    };

    useEffect(() => {
        setStarNumber(defaultRating);
    }, [defaultRating]);

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
            <div className={styles.ratingWrapper}>
                <div className={styles.rating}>
                    {rating.ratingImdb}
                </div>
                <div className={styles.ratingExtraInformation}>
                    <div className={styles.maxRating}>/10</div>
                    <div className={styles.voteCount}>{formatNumberThousand(rating.ratingImdbVoteCount)}</div>
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
