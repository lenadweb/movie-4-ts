import React, {useEffect, useState} from 'react';
import {ReactSVG} from "react-svg";
import styles from "./Diamonds.module.css";
import cn from "classnames";
import rhombus from '../../../assets/images/rhombus.svg';
import {CSSTransition} from "react-transition-group";
import Diamond from "./Diamond";


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
]

const Diamonds = () => {
    const diamondsSVG = [];
    for (let i = 0; i < 500; i++) {
        diamondsSVG.push(<Diamond delay={i * 10}/>)
    }

    return (
        <div className={cn(styles.wrapper)}>
            {diamondsSVG}
        </div>
    );
};

export default Diamonds;