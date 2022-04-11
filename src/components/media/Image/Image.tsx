import React, { FC } from 'react';
import styles from './Image.module.css';

interface IImage {
    src: string;
    width: string
}

const Image: FC<IImage> = ({ src, width = '100px' }) => (
    <img
        src={src}
        alt="img"
        className={styles.item}
        style={{
            width,
        }}
    />
);

export default Image;
