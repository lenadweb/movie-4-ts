import React, { FC } from 'react';
import { ReactSVG } from 'react-svg';
import cn from 'classnames';
import styles from './HeartLoading.module.css';
import heart from '../../../assets/images/heart-svg-animation.svg';

interface IHeartLoadingSmall {
    size?: string;
    color?: string;
    className?: string;
}

const HeartLoadingSmall: FC<IHeartLoadingSmall> = ({ size = '50px', color = '#C12C88', className }) => (
    <ReactSVG
        className={cn(styles.containerSmall, className)}
        style={{
            height: size,
            width: size,
        }}
        src={heart}
        beforeInjection={(svg) => {
            svg.setAttribute('fill', color);
        }}
    />
);

export default HeartLoadingSmall;
