import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { formatNumberThousand } from 'helpers/formatHelper';
import Display from 'components/utils/Display/Display';
import styles from './RatingDetails.module.css';
import useAuth from '../../../hooks/useAuth';
import useToast from '../../../hooks/useToast';
import { requireAuth } from '../../../helpers/toastHelper';
import HoverToolTip from '../../utils/HoverToolTip/HoverToolTip';
import HeartLoadingSmall from '../../utils/HeartLoading/HeartLoadingSmall';
import HorizontalLoading from '../../utils/HorizontalLoading/HorizontalLoading';

interface IRatingDetails {
    rating: any;
    loading: boolean;
    onChange: (rating: number)=>void;
    defaultRating: number;
}

const RatingDetails:FC<IRatingDetails> = ({ rating, loading, onChange, defaultRating }) => {
    const [starNumber, setStarNumber] = useState<number>(defaultRating);
    // eslint-disable-next-line no-debugger
    // debugger;
    const onClickHandler = (starCount: number): void => {
        setStarNumber(starCount);
        onChange(starCount);
    };

    useEffect(() => {
        setStarNumber(defaultRating);
        return () => {
            setStarNumber(0);
        };
    }, [defaultRating]);

    const stars = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
        stars.push(
            <HoverToolTip content={(i + 1).toString()} className={styles.starItemWrapper}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/control-has-associated-label,jsx-a11y/interactive-supports-focus */}
                <div
                    key={i}
                    className={cn(styles.star, {
                        [styles.starActive]: starNumber - 1 >= i,
                    })}
                    role="button"
                    onClick={requireAuth(() => onClickHandler(i + 1))}
                />
            </HoverToolTip>,
        );
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
                {
                    loading ? <HorizontalLoading count={10} /> : stars
                }
            </div>
        </div>
    );
};

export default RatingDetails;
