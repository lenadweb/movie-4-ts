import React, { FC } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import styles from './Rating.module.css';
import 'react-circular-progressbar/dist/styles.css';

interface IRating {
    color: string;
    rating: string | number;
    height?: string;
    width?: string;
}

const Rating:FC<IRating> = ({ color, rating, height = '40px', width = '40px' }) => (
    <div style={{
        height,
        width,
    }}
    >
        <CircularProgressbar
            value={(rating as number)}
            text={`${rating}`}
            styles={buildStyles({
                pathTransition: 'none',
                pathColor: color,
                textColor: color,
                trailColor: 'transparent',
                textSize: 36,
            })}
        />
    </div>
);

export default Rating;
