import React, { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo-movie.png';
import { useDispatch, useSelector } from 'react-redux';
import { navigationItems } from 'constants/navigation';
import SidebarNavigationItem from 'components/layout/SidebarNavigationItem/SidebarNavigationItem';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { selectSidebarVisible } from '../../../redux/reducers/AppSlice';

const Sidebar:FC = () => {
    const dispatch = useDispatch();
    const sidebarVisible = useSelector(selectSidebarVisible);
    const ref = useRef(null);

    return (
        <div
            className={cn(styles.sidebarContainer, {
                [styles.sidebarContainerVisible]: sidebarVisible,
            })}
            ref={ref}
        >
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
