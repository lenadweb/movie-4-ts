import React, { FC } from 'react';
import menuIcon from 'assets/images/hamburger-menu.svg';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import QuickSearch from '../QuickSearch/QuickSearch';
import Profile from '../Profile/Profile';
import Icon from '../../media/Icon/Icon';
import { selectSidebarVisible, setSidebarVisible } from '../../../redux/reducers/AppSlice';

const Header:FC = () => {
    const dispatch = useDispatch();
    const sidebarVisible = useSelector(selectSidebarVisible);

    const toggleMobileMenu = (): void => {
        dispatch(setSidebarVisible(!sidebarVisible));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
                <Icon src={menuIcon} size="m" />
            </div>
            <QuickSearch />
            <div className={styles.profile}>
                <Profile />
            </div>
        </div>
    );
};
export default Header;
