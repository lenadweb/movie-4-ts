import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import styles from './SidebarNavigationItem.module.css';

interface ISidebarNavigationItem {
    link: string;
    img: string;
    name: string;
}

const SidebarNavigationItem: FC<ISidebarNavigationItem> = ({ link, img, name }) => {
    const isRandomLoading = false;
    const [isActive, setActive] = useState(false);
    const [isAnimation, setIsAnimation] = useState(false);

    useEffect(() => {
        if (isRandomLoading) {
            setIsAnimation(true);
            setTimeout(() => {
                setIsAnimation(false);
            }, 600);
        }
    }, [isRandomLoading]);

    return (
        <Link
            to={`/${link}`}
            className={cn(styles.item, {
                [styles.itemAnimation]: isAnimation,
                [styles.itemActive]: isAnimation,
            })}
        >
            <div className={styles.navlinkContent}>
                <span>{name}</span>
                <ReactSVG src={img} />
            </div>
        </Link>
    );
};

export default SidebarNavigationItem;
