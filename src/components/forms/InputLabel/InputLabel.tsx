import React, { FC } from 'react';
import styles from './InputLabel.module.css';

interface IInputLabel {
    caption: string,
}

const InputLabel: FC<IInputLabel> = ({ caption }) => (
    <div className={styles.container}>
        { caption }
    </div>
);

export default InputLabel;
