import React, { FC } from 'react';
import styles from './LoadingSpinner.module.css';

interface ISpinnerSvg {
    color: string;
    height?: string;
    width?: string;
}

interface ILoadingSpinner {
    loaded: boolean;
    color?: string;
    width?: string;
    height?: string;
}

const SpinnerSvg: FC<ISpinnerSvg> = ({ color, height = '24px', width = '24px' }) => (
    <div className={styles.spinner}>
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            style={{
                display: 'block',
                backgroundRepeat: 'initial',
                backgroundColor: 'transparent',
                animationPlayState: 'paused',
            }}
        >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke={color}
                strokeWidth="7"
                r="31"
                strokeDasharray="146.08405839192537 50.69468613064179"
                transform="matrix(1,0,0,1,0,0)"
                style={{
                    transform: 'matrix(1, 0, 0, 1, 0, 0)',
                    animationPlayState: 'paused',
                }}
            />
        </svg>
    </div>

);

const LoadingSpinner: FC<ILoadingSpinner> = ({ loaded = false, color = '#dedede', height = '24px', width = '24px', children }) => (
    loaded
        ? (
            <>
                { children }
            </>
        )
        : (
            <div
                className={styles.loading}
                style={{
                    width,
                    height,
                }}
            >
                <SpinnerSvg color={color} />
            </div>
        )
);

export default LoadingSpinner;
