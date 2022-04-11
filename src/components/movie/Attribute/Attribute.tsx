import React, { FC } from 'react';
import styles from './Attribute.module.css';

interface IAttribute {
    caption: string;
    content: any;
}

const Attribute:FC<IAttribute> = ({ caption, content }) => (
    <div className={styles.container}>
        <span className={styles.caption}>
            {caption}
            :
        </span>
        <span className={styles.content}>{content}</span>
    </div>
);

export default Attribute;
