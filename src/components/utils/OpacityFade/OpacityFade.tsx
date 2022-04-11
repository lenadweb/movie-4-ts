import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './OpacityFade.module.css';

export interface IOpacityFade {
    show?: boolean;
    timeout?: number;
    group?: boolean;
}

const OpacityFade: FC<IOpacityFade> = ({ show = true, timeout = 200, children, group = false }) => {
    const transition = (
        <CSSTransition
            appear
            in={show}
            timeout={timeout}
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
            unmountOnExit
            mountOnEnter
        >
            <>
                { children }
            </>
        </CSSTransition>
    );

    return group ? (
        <TransitionGroup>
            { transition }
        </TransitionGroup>
    ) : transition;
};

export default OpacityFade;
