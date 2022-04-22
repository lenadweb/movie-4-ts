import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from 'src/components/inputs/Switch/Switch.module.css';

const Switch = ({ onChange, defaultValue = false }) => {
    const [checked, setChecked] = useState(defaultValue);

    useEffect(() => {
        onChange(checked);
    }, [checked]);

    const onClickHandler = (e) => {
        setChecked(e.target.checked);
    };
    return (
        <div className={styles.switchWrapper}>
            <label className={styles.switch}>
                <input type="checkbox" checked={checked} onChange={onClickHandler} />
                <span className={cn(styles.slider, styles.round)} />
            </label>
        </div>
    );
};

export default Switch;
