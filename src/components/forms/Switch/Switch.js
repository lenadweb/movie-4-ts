import React, {useEffect, useState} from 'react';
import styles from "./Switch.module.css";
import cn from "classnames";

const Switch = ({onChange, defaultValue=false}) => {
    const [checked, setChecked] = useState(defaultValue);

    useEffect(()=>{
        onChange(checked);
    }, [checked])

    const onClickHandler = (e) => {
        setChecked(e.target.checked);
    }
    return (
        <div className={styles.switchWrapper}>
            <label className={styles.switch}>
                <input type="checkbox" checked={checked} onChange={onClickHandler}/>
                <span className={cn(styles.slider, styles.round)}/>
            </label>
        </div>
    );
};

export default Switch;