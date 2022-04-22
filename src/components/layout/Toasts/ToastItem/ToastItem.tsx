import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import closeIcon from 'assets/images/close-white.svg';
import successIcon from 'assets/images/toasts/success.svg';
import warningIcon from 'assets/images/toasts/warning.svg';
import errorIcon from 'assets/images/toasts/error.svg';
import { TToastItem } from 'redux/reducers/ToastsSlice';
import OpacityFadeSlide from 'components/utils/OpacityFadeSlide/OpacityFadeSlide';
import Icon from 'components/media/Icon/Icon';
import Row from 'components/utils/Row/Row';
import InputIcon from '../../../inputs/InputIcon/InputIcon';
import styles from './ToastItem.module.css';

const titles = {
    warning: 'Предупреждение',
    error: 'Ошибка',
    success: 'Успешно',
};

const images = {
    warning: warningIcon,
    error: errorIcon,
    success: successIcon,
};

const ToastItem: FC<TToastItem> = ({ type, caption }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 4000);
    }, []);
    return (
        <OpacityFadeSlide show={visible}>
            <div className={cn(styles.wrapper, {
                [styles.wrapperWarning]: type === 'warning',
                [styles.wrapperError]: type === 'error',
                [styles.wrapperSuccess]: type === 'success',
            })}
            >
                <Row justifyContent="space-between" alignItems="center">
                    <div className={styles.content}>
                        <Icon size="m" className={styles.notificationImage} src={images[type]} />
                        <div>
                            <div className={styles.title}>{ titles[type] }</div>
                            <div className={styles.caption}>{ caption }</div>
                        </div>
                    </div>
                    <InputIcon
                        className={styles.closeBtn}
                        onClick={() => setVisible(false)}
                        icon={closeIcon}
                    />
                </Row>
            </div>
        </OpacityFadeSlide>
    );
};

export default ToastItem;
