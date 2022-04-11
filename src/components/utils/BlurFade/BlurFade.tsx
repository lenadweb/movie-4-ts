import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './BlurFade.css';

interface IBlurFade {
    show: boolean;
    children: any
}

const BlurFade:FC<IBlurFade> = ({ show, children }) => (
    <CSSTransition
        appear
        in={!!show}
        timeout={200}
        classNames={{
            enterDone: styles.blurEnter,
            exitDone: styles.blurExit,
        }}
        unmountOnExit
        mountOnEnter
    >
        {children}
    </CSSTransition>
);

export default BlurFade;
