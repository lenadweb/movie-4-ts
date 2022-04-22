import React, { FC } from 'react';
import CheckInput from '../CheckInput/CheckInput';
import styles from './CheckboxGroup.module.css';

export interface CheckboxValue {
    value: string | number;
    caption: string;
    isEnable: boolean
}

interface ICheckboxGroup {
    values: Array<CheckboxValue>;
    onChange: (values: Array<any>) => void;
}

const CheckboxGroup: FC<ICheckboxGroup> = ({ values, onChange }) => {
    const handleChange = (index: number, value: boolean): void => {
        onChange(values.map((item, ind) => (index === ind ? {
            ...item,
            isEnable: value,
        } : item)));
    };

    return (
        <>
            {
                values.map((item, index) => (
                    <CheckInput
                        key={item.value}
                        onChange={(value) => handleChange(index, value)}
                        caption={item.caption}
                        checked={item.isEnable}
                    />
                ))
            }
        </>
    );
};

export default CheckboxGroup;
