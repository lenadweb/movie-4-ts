import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Row.module.css';

interface IRow {
    justifyContent?: string,
    alignItems?: 'flex-start' | 'center' | 'flex-end',
    className?: string,
    gap?: string,
}

const Row: FC<IRow> = ({ justifyContent = 'space-between', alignItems = 'flex-start', className, gap, children }) => (
    <div
        className={cn(styles.item, className)}
        style={{
            justifyContent,
            alignItems,
            gridGap: gap,
        }}
    >
        { children }
    </div>
);

export default Row;
