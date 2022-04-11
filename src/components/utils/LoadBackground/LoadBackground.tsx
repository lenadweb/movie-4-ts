import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import bgIcon from 'assets/images/heart-svg-animation.svg';
import styles from './LoadBackground.module.css';

interface ILoadBackground {
    poster: string;
    height?: string;
    width?: string;
}

const LoadBackground:FC<ILoadBackground> = ({ poster, height = '160px', width = '106px' }) => {
    const [loadImg, setLoadImg] = useState(false);
    const onLoadImage = (): void => {
        setTimeout(() => {
            setLoadImg(true);
        }, 300);
    };

    useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = poster;

        imageLoader.onload = () => {
            setLoadImg(true);
        };
    }, []);

    return (
        <div className={styles.load}>
            <div
                className={styles.loadImage}
                style={{
                    backgroundImage: `url(${bgIcon})`,
                    backgroundSize: `calc(${width} / 1.5)`,
                    minWidth: width,
                    minHeight: height,
                }}
            />
            <div
                className={cn(styles.loadImage, styles.holder, {
                    [styles.loaded]: loadImg,
                })}
                style={{ backgroundImage: `url(${poster})` }}
            />
        </div>

    );
};

export default LoadBackground;
