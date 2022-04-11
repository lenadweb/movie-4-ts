import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Chip.module.css';

interface IChip {
    color: string;
    className?: string;
}

const Chip: FC<IChip> = ({ color, className, children }) => (
    <span
        className={cn(styles.item, className)}
        style={{
            backgroundColor: color,
        }}
    >
        { children }
    </span>
);

export default Chip;
