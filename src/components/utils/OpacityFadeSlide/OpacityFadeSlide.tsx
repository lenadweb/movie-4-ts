import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from 'common/components/utils/OpacityFadeSlide/OpacityFadeSlide.module.css';

export interface IOpacityFadeSlide {
    show?: boolean;
    timeout?: number;
}

const OpacityFadeSlide: FC<IOpacityFadeSlide> = ({ show = true, timeout = 200, children }) => {
    const ref = useRef<any>(null);
    const [height, setHeight] = useState<any>(null);
    const [isShow, setShow] = useState(true);

    console.log(ref);
    useEffect(() => {
        const nHeight = ref?.current?.getBoundingClientRect().height;
        if (nHeight) setHeight(nHeight);
    }, [ref]);

    const onExitHandler = ():void => {
        setTimeout(() => {
            setShow(false);
        }, 200);
    };

    const transition = (
        <CSSTransition
            onExited={onExitHandler}
            appear
            in={show}
            timeout={timeout}
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                enterDone: styles.enterDone,
                exit: styles.exit,
                exitActive: styles.exitActive,
                exitDone: styles.exitDone,
            }}
        >
            <div
                ref={ref}
                className={styles.item}
                style={{
                    height: height !== null ? height : 'auto',
                }}
            >
                { children }
            </div>
        </CSSTransition>
    );

    if (isShow) return transition;

    return null;
};

export default OpacityFadeSlide;
