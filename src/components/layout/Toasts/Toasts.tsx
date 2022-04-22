import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { selectToasts } from 'redux/reducers/ToastsSlice';
import ToastItem from './ToastItem/ToastItem';
import styles from './Toasts.module.css';

const Toasts: FC = () => {
    const toastsList = useSelector(selectToasts);
    return ReactDOM.createPortal(
        <div className={styles.container}>
            {
                toastsList.map((item) => (
                    <ToastItem
                        type={item.type}
                        caption={item.caption}
                    />
                ))
            }
        </div>,
        document.body,
    );
};

export default Toasts;
