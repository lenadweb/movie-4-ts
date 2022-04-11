import React, { FC } from 'react';
import cn from 'classnames';
import eyeSvg from 'assets/images/eye.svg';
import eyeSvgSlash from 'assets/images/eye-slash.svg';
import styles from './TextInput.module.css';
import InputIcon from '../InputIcon/InputIcon';
import { useToggle } from '../../../hooks/useToggle';

interface ITextInput {
    value?:string;
    onChange?: ()=> void;
    type?: 'text' | 'password';
    className?: string;
    validate?: any;
}

const TextInput: FC<ITextInput> = ({ type = 'text', value, onChange, className, validate = {} }) => {
    const [passwordVisible, togglePasswordVisible] = useToggle();

    if (type === 'password') {
        return (
            <div className={cn(styles.wrapper, className)}>
                <input
                    className={cn(styles.textInput)}
                    type={passwordVisible ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    {...validate}
                />
                <div className={styles.passwordBtnContainer}>
                    <InputIcon
                        onClick={togglePasswordVisible}
                        icon={passwordVisible ? eyeSvgSlash : eyeSvg}
                        className={styles.visiblePassBtn}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <input
                className={styles.textInput}
                type={type}
                value={value}
                onChange={onChange}
                {...validate}
            />
        </div>
    );
};

export default TextInput;
