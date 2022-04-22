import React, { FC } from 'react';
import styles from './HorizontalLoading.module.css';

interface IHorizontalLoading {
    size?: number;
    count?: number;
}

const HorizontalLoading:FC<IHorizontalLoading> = ({ size = 16, count = 8 }) => {
    const margin = 8;
    const width = size * count + count * (margin * 0.9);
    const speed = 0.0465;
    const startDelay = 0;

    const items = Array.from({ length: count }).map((item, index) => (
        <div
            className={styles.item}
            style={{
                left: `${size * index + index * margin}px`,
                animationDelay: `${startDelay + index * speed}s`,
                animationDuration: `${startDelay + count * speed}s`,
            }}
        />
    ));

    return (
        <div
            className={styles.wrapper}
            style={{
                width: `${width}px`,
                height: `${size}px`,
            }}
        >
            {
                items
            }
        </div>
    );
};

export default HorizontalLoading;
