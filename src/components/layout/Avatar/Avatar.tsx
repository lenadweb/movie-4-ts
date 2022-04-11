import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Avatar.module.css';

interface IAvatar {
    img: string;
    size: 's'|'m'|'l';
    className?: string;
}

const Avatar: FC<IAvatar> = ({ img, size = 'm', className }) => (
    <div>
        <div
            className={cn(styles.img, className, {
                [styles.imgSizeS]: size === 's',
                [styles.imgSizeM]: size === 'm',
                [styles.imgSizeL]: size === 'l',
            })}
            style={{
                backgroundImage: `url(${img})`,
            }}
        />
    </div>
);

export default Avatar;
