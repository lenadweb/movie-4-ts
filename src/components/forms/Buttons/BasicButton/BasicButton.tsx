import React, { FC } from 'react';
import cn from 'classnames';
import styles from './BasicButton.module.css';
import Icon from '../../../media/Icon/Icon';

interface IBasicButton {
    icon?: string;
    caption:string;
    onClick: ()=>void;
    className?:string;
}

const BasicButton: FC<IBasicButton> = ({ caption, onClick, className, icon }) => (
    <button
        type="button"
        aria-label="cta"
        className={cn(styles.item, className)}
        onClick={onClick}
    >
        {
            icon ? (
                <div className={styles.content}>
                    <Icon src={icon} className={styles.icon} />
                    { caption }
                </div>
            ) : caption
        }
    </button>
);

export default BasicButton;
