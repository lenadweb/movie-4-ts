import React, { FC } from 'react';
import styles from './InlineAlert.module.css';

interface IInlineAlert {
    caption: string;
}

const InlineAlert: FC<IInlineAlert> = ({ caption }) => (
    <span className={styles.item}>{ caption }</span>
);

export default InlineAlert;
