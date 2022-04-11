import React, { FC } from 'react';
import cn from 'classnames';
import styles from './H.module.css';

interface IHeaders {
    size?: 's'|'m'|'l'|'xl';
    color?: string;
    className?: string;
}

const H:FC<IHeaders> = ({ size = 's', color = 'inherit', children, className = null }) => {
    switch (size) {
    case 's':
        return <h5 className={cn(styles.item, styles.small, className)}>{children}</h5>;
    case 'm':
        return <h3 className={cn(styles.item, styles.medium, className)}>{children}</h3>;
    case 'l':
        return <h2 className={cn(styles.item, styles.large, className)}>{children}</h2>;
    case 'xl':
        return <h1 className={cn(styles.item, styles.xlarge, className)}>{children}</h1>;
    default:
        return null;
    }
};

export default H;
