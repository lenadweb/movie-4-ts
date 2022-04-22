import React, { FC } from 'react';
import styles from './CheckInput.module.css';

interface ICheckInput {
    caption: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    validate?: any;
}

const CheckInput: FC<ICheckInput> = ({ caption, checked, onChange, validate }) => (
    <div className={styles.container}>
        <label className={styles.rowCheckbox}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange && onChange(e.target.checked)}
                {...validate}
            />
            <span>{ caption }</span>
        </label>
    </div>
);

export default CheckInput;
