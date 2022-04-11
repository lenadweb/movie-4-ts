import React, { FC } from 'react';
import styles from './Header.module.css';
import QuickSearch from '../QuickSearch/QuickSearch';
import Profile from '../Profile/Profile';

const Header:FC = () => (
    <div className={styles.wrapper}>
        <QuickSearch />
        <div className={styles.profile}>
            <Profile />
        </div>
    </div>
);

export default Header;
