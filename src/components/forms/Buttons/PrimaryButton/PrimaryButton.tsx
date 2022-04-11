import React, { FC } from 'react';
import cn from 'classnames';
import styles from './PrimaryButton.module.css';

interface IPrimaryButton {
    caption: string;
    className?: string;
    [key: string]: any;
}
const PrimaryButton:FC<IPrimaryButton> = ({ caption, className, ...rest }) => (
    <div className={cn(styles.container, className)} {...rest}>
        {caption}
    </div>
);

export default PrimaryButton;
