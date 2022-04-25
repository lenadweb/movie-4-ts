import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Diamonds.module.css';
import Diamond from './Diamond';

// const colours = [
//     '#C12C88',
//     '#C12C88',
//     '#C12C88',
//     '#C12C88',
//     '#C12C88',
//     '#C12C88',
//     '#BC2BAC',
//     '#9420C4',
//     '#D793C9',
//     '#E0ADC0',
//     '#F0ECBE',
//     '#81E7F3',
//     '#DEF1D9',
//     '#F2E7E8',
//     '#F6F2FA',
//     '#F1EEF7',
//     '#ECDBF4',
//     '#C16BAC',
// ]

const cssClasses = [
    styles.stroke,
    styles.filled,
];

const Diamonds:FC = () => {
    const diamondsSVG = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 500; i++) {
        diamondsSVG.push(<Diamond key={i} delay={i * 10} />);
    }

    return (
        <div className={cn(styles.wrapper)}>
            {diamondsSVG}
        </div>
    );
};

export default Diamonds;
