import React, { FC } from 'react';
import cn from 'classnames';
import styles from './TextButton.module.css';

interface ITextButton {
    caption: string;
    className?: string;
    onClick?: () => void;
}

const TextButton: FC<ITextButton> = ({ caption, className, onClick }) => (
    <button
        type="button"
        aria-label="cta-inline"
        className={cn(styles.item, className)}
        onClick={onClick}
    >
        { caption }
    </button>
);

export default TextButton;
