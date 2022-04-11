import React, { FC } from 'react';
import cn from 'classnames';
import styles from './CircleButton.module.css';

interface ICircleButton {
    icon: string;
    onClick: () => void
    className?: string;
}

const CircleButton:FC<ICircleButton> = ({ icon, onClick, className = null }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/control-has-associated-label
    <div
        role="button"
        tabIndex={0}
        className={cn(styles.container, className)}
        onClick={onClick}
        style={{
            backgroundImage: `url(${icon})`,
        }}
    />
);

export default CircleButton;
