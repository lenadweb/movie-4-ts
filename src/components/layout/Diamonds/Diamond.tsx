import React, { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import rhombus from 'assets/images/rhombus.svg';
import styles from './Diamonds.module.css';

export const coloursInitial = [
    '#60B8BB',
    '#CE2C83',
    '#61C6A5',
    '#D88271',
    '#E0E56D',
    '#4712A4',
    '#341FB7',
    '#68D063',
    '#cd32be',
];

const Diamond:FC<{delay: number}> = ({ delay }) => {
    const [visible, setVisible] = useState(true);
    const [colours, setColours] = useState(coloursInitial[Math.floor(Math.random() * coloursInitial.length)]);
    const [width, setWidth] = useState(Math.random() * 10);
    const [top, setTop] = useState(Math.random() * 100);
    const [left, setLeft] = useState(Math.random() * 100);

    return (
        <ReactSVG
            src={rhombus}
            className={styles.diamond}
            style={{
                animationDelay: `${delay}ms`,
            }}
            beforeInjection={(svg) => {
                svg.setAttribute('fill', colours);
                svg.setAttribute(
                    'style',
                    `width: ${width}px;
                                height: auto;
                                top: ${top}%;
                                left: ${left}%`,
                );
            }}
        />
    );
};

export default Diamond;
