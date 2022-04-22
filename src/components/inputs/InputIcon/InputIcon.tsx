import React, { FC } from 'react';
import cn from 'classnames';
import styles from './InputIcon.module.css';

interface IInputIcon {
    icon: string,
    onClick: () => void;
    className?: string;
}

const InputIcon: FC<IInputIcon> = ({ onClick, icon, className }) => (
    <button
        type="button"
        aria-label="input icon"
        className={cn(styles.item, className)}
        onClick={onClick}
        style={{
            backgroundImage: `url(${icon})`,
        }}
    />
);

export default InputIcon;
