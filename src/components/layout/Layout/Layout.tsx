import React, { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { Outlet, Route } from 'react-router-dom';
import Sidebar from 'components/layout/Sidebar/Sidebar';
import Header from 'components/layout/Header/Header';
import styles from './Layout.module.css';

const Layout: FC = () => (
    <div className={cn(styles.app)}>
        <div className={styles.container}>
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.mainContent}>
                    <Header />
                    <div className={styles.pageWrapper}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
        {/* <Diamonds/> */}
    </div>
);

export default Layout;
