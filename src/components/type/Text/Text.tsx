import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Text.module.css';

const sizes = {
    xs: '10px',
    s: '10px',
    m: '12px',
    l: '16px',
    xl: '16px',
};

interface IText {
    className?: string;
    size?: 'xs'|'s'|'m'|'l'|'xl';
    bold?: boolean;
}

const Text: FC<IText> = ({ size = 'm', bold = false, className, children }) => (
    <span
        className={cn(styles.item, className)}
        style={{
            fontSize: sizes[size],
            fontWeight: bold ? 'bold' : 'initial',
        }}
    >
        { children }
    </span>
);

export default Text;
