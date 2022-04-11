import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo-movie.png';
import { useDispatch } from 'react-redux';
import { navigationItems } from 'constants/navigation';
import SidebarNavigationItem from 'components/layout/SidebarNavigationItem/SidebarNavigationItem';
import styles from './Sidebar.module.css';

const Sidebar:FC = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <Link to="/" className={styles.linkLogo}>
                    <div className={styles.sidebarLogo}>
                        <img src={logo} alt="" />
                    </div>
                </Link>
                <div className={styles.navigation}>
                    {
                        navigationItems.map((item) => (
                            <SidebarNavigationItem
                                key={item.link}
                                link={item.link}
                                img={item.img}
                                name={item.nameRu}
                            />
                        ))
                    }
                </div>
                <div className={styles.switchTheme}>
                    {/* <Switch defaultValue onChange={(theme) => dispatch(setTheme(theme))} /> */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
