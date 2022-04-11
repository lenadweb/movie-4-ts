import React, { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import heart from 'assets/images/heart.svg';
import cn from 'classnames';
import styles from './HeartLoading.module.css';
import { heartPathsColors } from '../../../constants/colors';

const classNames = [
    styles.pink,
    styles.pink,
    styles.pink,
    styles.pink,
    styles.pink1,
    styles.pink2,
    styles.pink3,
    styles.pink4,
    styles.pink5,
    styles.pink6,
    styles.pink7,
    styles.pink8,
    styles.pink9,
    styles.pink10,
    styles.pink11,
    styles.pink12,
];

const getMinimalAnimationTime = (time: number): number => ((Math.floor(time / 500) + 1) * 500) - time;

interface IHeartLoading {
    load: boolean;
    children: any;
}

const HeartLoading:FC<IHeartLoading> = ({ load, children }) => {
    const [showChildren, setShowChildren] = useState(false);
    const [firstRenderTime, setFirstRenderTime] = useState(new Date().getTime());
    const [exitHeart, setExitHeart] = useState(false);
    const [offsetColor, setOffsetColor] = useState(0);
    let timeoutOffsetColor: any = null;
    let timeoutDelayShowChildren: any = null;
    useEffect(() => {
        if (load) {
            clearTimeout(timeoutDelayShowChildren);
            timeoutDelayShowChildren = setTimeout(() => {
                setExitHeart(load);
                const time = new Date().getTime();
                console.log(getMinimalAnimationTime(time - firstRenderTime));
                setTimeout(() => setShowChildren(load), getMinimalAnimationTime(time - firstRenderTime) + 100);
            }, 0);
        } else {
            setShowChildren(false);
            setExitHeart(false);
        }
        return () => clearTimeout(timeoutDelayShowChildren);
    }, [load]);

    useEffect(() => {
        timeoutOffsetColor = setInterval(() => {
            setOffsetColor((prevState) => prevState + 1);
        }, 100);
        return () => clearInterval(timeoutOffsetColor);
    }, []);

    return (
        showChildren ? children : (
            <div className={cn(styles.heart, {
                [styles.exitHeart]: exitHeart,
            })}
            >
                <div className={styles.inner}>
                    <div className={styles.heartItems}>
                        <ReactSVG
                            src={heart}
                            className={classNames[(offsetColor + 5) % classNames.length]}
                            beforeInjection={(svg) => {
                                svg.setAttribute('fill', heartPathsColors[Math.floor(Math.random() * heartPathsColors.length)]);
                                svg.setAttribute(
                                    'style',
                                    `width: 100px;
                           height: 100px;
                           top: 60px;
                           left: 60px;
                           opacity: 0.5;`,
                                );
                            }}
                        />
                        <ReactSVG
                            src={heart}
                            className={classNames[(offsetColor + 4) % classNames.length]}
                            beforeInjection={(svg) => {
                                svg.setAttribute('fill', heartPathsColors[Math.floor(Math.random() * heartPathsColors.length)]);
                                svg.setAttribute(
                                    'style',
                                    `width: 124px;
                           height: 124px;
                           top: 48px;
                           left: 48px;
                           opacity: 0.6;`,
                                );
                            }}
                        />
                        <ReactSVG
                            src={heart}
                            className={classNames[(offsetColor + 3) % classNames.length]}
                            beforeInjection={(svg) => {
                                svg.setAttribute('fill', heartPathsColors[Math.floor(Math.random() * heartPathsColors.length)]);
                                svg.setAttribute(
                                    'style',
                                    `width: 148px;
                           height: 148px;
                           top: 36px;
                           left: 36px;
                           opacity: 0.7;`,
                                );
                            }}
                        />
                        <ReactSVG
                            src={heart}
                            className={classNames[(offsetColor + 2) % classNames.length]}
                            beforeInjection={(svg) => {
                                svg.setAttribute('fill', heartPathsColors[Math.floor(Math.random() * heartPathsColors.length)]);
                                svg.setAttribute(
                                    'style',
                                    `width: 172px;
                           height: 172px;
                           top: 24px;
                           left: 24px;
                           opacity: 0.8;`,
                                );
                            }}
                        />
                        <ReactSVG
                            src={heart}
                            className={classNames[(offsetColor + 1) % classNames.length]}
                            beforeInjection={(svg) => {
                                svg.setAttribute('fill', heartPathsColors[Math.floor(Math.random() * heartPathsColors.length)]);
                                svg.setAttribute(
                                    'style',
                                    `width: 196px;
                           height: 196px;
                           top: 12px;
                           left: 12px;
                           opacity: 0.9;`,
                                );
                            }}
                        />
                        <ReactSVG
                            src={heart}
                            className={classNames[(offsetColor) % classNames.length]}
                            beforeInjection={(svg) => {
                                svg.setAttribute('fill', heartPathsColors[Math.floor(Math.random() * heartPathsColors.length)]);
                                svg.setAttribute(
                                    'style',
                                    `width: 220px;
                           height: 220px;
                           top: 0px;
                           left: 0px;
                           opacity: 1;`,
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default HeartLoading;
