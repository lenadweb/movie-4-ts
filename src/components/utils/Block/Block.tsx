import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Block.module.css';

interface IBlock {
    className?: string;
}

const Block: FC<IBlock> = ({ children, className }) => (
    <div className={cn(styles.item, className)}>
        { children }
    </div>
);

export default Block;
