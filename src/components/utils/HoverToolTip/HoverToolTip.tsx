import React, { FC, MouseEventHandler, ReactElement, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './HoverToolTip.module.css';
import Portal from '../Portal/Portal';

interface IHoverToolTip {
    content: ReactElement | string;
    className?: string;
}

const HoverToolTip:FC<IHoverToolTip> = ({ children, className = '', content }) => {
    const ref = useRef<any>(null);
    const [isHover, setHover] = useState(false);
    const [position, setPosition] = useState<number[]>([]);

    const onMouseMoveHandler:MouseEventHandler<HTMLDivElement> = (e):void => {
        const { pageX, pageY } = e;
        setPosition([pageY, pageX]);
    };

    return (
        <div
            className={cn(styles.wrapper, className)}
            ref={ref}
            onMouseEnter={() => setHover(true)}
            onMouseMove={onMouseMoveHandler}
            onMouseLeave={() => setHover(false)}
        >
            {children}
            {
                isHover ? (
                    <Portal>
                        <div
                            className={styles.tooltip}
                            style={{
                                top: position[0] - 20,
                                left: position[1],
                            }}
                        >
                            {content}
                        </div>
                    </Portal>
                ) : null
            }
        </div>
    );
};

export default HoverToolTip;
