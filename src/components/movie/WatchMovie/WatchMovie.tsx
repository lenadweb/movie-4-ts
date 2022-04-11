import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './WatchMovie.module.css';

interface IWatchMovie {
    movieId: number;
    onClose: ()=> void;
}

const WatchMovie:FC<IWatchMovie> = ({ movieId, onClose }) => {
    const [showBtn, setShowBtn] = useState(false);

    const onKeyDown = (e: KeyboardEvent):void => {
        if (e.keyCode === 27) {
            onClose();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setShowBtn(true);
        }, 700);
        setTimeout(() => {
            setShowBtn(false);
        }, 3500);
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <iframe
                title="movie-watch"
                className={styles.container}
                src={`https://lenad.site/films/${movieId}`}
                allowFullScreen
            />
            <div className={styles.closeWrapper}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                    className={cn(styles.btnClose, {
                        [styles.btnCloseShow]: showBtn,
                    })}
                    onClick={onClose}
                >
                    Закрыть
                </div>
            </div>
        </div>

    );
};

export default WatchMovie;
