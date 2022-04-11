import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileMenuItem.module.css';
import Icon from '../../../media/Icon/Icon';
import Text from '../../../type/Text/Text';

interface IProfileMenuItem {
    icon: string;
    caption: string;
    link: string;
}

const ProfileMenuItem: FC<IProfileMenuItem> = ({ caption, link, icon }) => (
    <Link to={link} className={styles.wrapper}>
        <Text>{ caption }</Text>
        <div className={styles.icon}>
            <Icon src={icon} />
        </div>
    </Link>
);

export default ProfileMenuItem;
