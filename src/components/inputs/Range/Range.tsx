import React, { ChangeEvent, FC } from 'react';
import './RcRange.css';
import Slider from 'rc-slider';
import { formatNumberThousand } from 'helpers/formatHelper';
import styles from './Range.module.css';

interface IRangeInput {
    min: number;
    max: number;
    value: number[];
    onChange: (value: number[]) => void;
    postfix?: string;
    textInput?: boolean;
    disable?: boolean;
    step?: number;
}

const RangeInput: FC<IRangeInput> = ({ disable, step = 1, min, max, value, onChange, postfix, textInput = true }) => {
    const handleMinChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange([parseInt(e.target.value.replace(/\s+/g, ''), 10), value[1]]);
    };

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange([value[0], parseInt(e.target.value.replace(/\s+/g, ''), 10)]);
    };

    return (
        <div>
            <div className={styles.slider}>
                <Slider
                    range
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(nValue) => onChange(nValue as number[])}
                />
            </div>
            {
                textInput ? (
                    <div className={styles.filterInputs}>
                        <div className={styles.inputTextWrapper}>
                            <input
                                disabled={disable}
                                className={styles.inputText}
                                placeholder={formatNumberThousand(min)}
                                type="text"
                                value={formatNumberThousand(value[0])}
                                onChange={handleMinChange}
                            />
                            <span className={styles.postfix}>{ postfix }</span>
                        </div>
                        <div className={styles.inputTextWrapper}>
                            <input
                                disabled={disable}
                                className={styles.inputText}
                                placeholder={formatNumberThousand(max)}
                                type="text"
                                value={formatNumberThousand(value[1])}
                                onChange={handleMaxChange}
                            />
                            <span className={styles.postfix}>{ postfix }</span>
                        </div>
                    </div>
                ) : null
            }

        </div>

    );
};

export default RangeInput;
