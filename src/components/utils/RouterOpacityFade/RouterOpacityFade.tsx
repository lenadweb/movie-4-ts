import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IOpacityFade } from '../OpacityFade/OpacityFade';
import styles from './RouterOpacityFade.module.css';

interface IRouterOpacityFade extends IOpacityFade {
    location: any
}

const RouterOpacityFade: FC<IRouterOpacityFade> = ({ show = true, timeout = 200, children, location }) => (
    <TransitionGroup>
        <CSSTransition
            key={location}
            appear
            in={show}
            timeout={timeout}
            classNames={{
                appear: styles.item,
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
            }}
        >
            { children }
        </CSSTransition>
    </TransitionGroup>
);

export default RouterOpacityFade;
