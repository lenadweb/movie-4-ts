import React, { FC, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { Outlet, Route } from 'react-router-dom';
import Sidebar from 'components/layout/Sidebar/Sidebar';
import Header from 'components/layout/Header/Header';
import { selectToken } from 'redux/reducers/UserSlice';
import styles from './Layout.module.css';
import { useGetMeQuery } from '../../../api/BaseApi';
import Diamonds from '../Diamonds/Diamonds';
import SmoothScroll from '../../utils/SmoothScroll/SmoothScroll';

const Layout: FC = () => (
    <div className={cn(styles.app)}>
        <div className={styles.container}>
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.mainContent}>
                    <Header />
                    <div className={styles.pageWrapper}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
        <Diamonds />
        <SmoothScroll />
    </div>
);

export default Layout;
