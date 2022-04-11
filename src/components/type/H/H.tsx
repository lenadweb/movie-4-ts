import React, { FC } from 'react';
import cn from 'classnames';
import styles from './H.module.css';

interface IHeader {
    size?: 'xs'|'s'|'m'|'l'|'xl';
    className?: string;
    bold?: boolean;
}

const H: FC<IHeader> = ({ size = 's', bold = false, className, children }) => {
    switch (size) {
    case 's':
        return (
            <h5
                className={cn(styles.item, styles.small, className, {
                    [styles.bold]: bold,
                })}
            >
                { children }
            </h5>
        );
    case 'm':
        return (
            <h3
                className={cn(styles.item, styles.medium, className, {
                    [styles.bold]: bold,
                })}
            >
                { children }
            </h3>
        );
    case 'l':
        return (
            <h2
                className={cn(styles.item, styles.large, className, {
                    [styles.bold]: bold,
                })}
            >
                { children }
            </h2>
        );
    case 'xl':
        return (
            <h1
                className={cn(styles.item, styles.xlarge, className, {
                    [styles.bold]: bold,
                })}
            >
                { children }
            </h1>
        );
    default:
        return null;
    }
};

export default H;
