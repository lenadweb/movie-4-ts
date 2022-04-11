import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Section.module.css';

interface ISection {
    className?: string;
    [key: string]: any;
}

const Section:FC<ISection> = ({ children, className, ...rest }) => (
    <div className={cn(styles.wrapper, className)} {...rest}>
        {children}
    </div>
);

export default Section;
