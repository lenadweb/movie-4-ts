import React, { FC, useRef, useState } from 'react';
import img from 'assets/images/share.svg';
import avatarIcon from 'assets/images/profile.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Profile.module.css';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import ProfileMenuItem from './ProfileMenuItem/ProfileMenuItem';
import OpacityFade from '../../utils/OpacityFade/OpacityFade';
import Avatar from '../Avatar/Avatar';
import Text from '../../type/Text/Text';
import useAuth from '../../../hooks/useAuth';
import { selectUser } from '../../../redux/reducers/UserSlice';
import { selectPageLoading } from '../../../redux/reducers/AppSlice';
import { selectPending } from '../../../redux/reducers/MoviesSlice';
import HeartLoadingSmall from '../../utils/HeartLoading/HeartLoadingSmall';

export const profileRoutes = [
    {
        caption: 'Профиль',
        icon: img,
        link: '/profile',
    },
    {
        caption: 'Настройки',
        icon: img,
        link: '/settings',
    },
    {
        caption: 'Выйти',
        icon: img,
        link: '/logout',
    },
];

const Profile: FC = () => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const isAuth = useAuth();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const isLoading = useSelector(selectPending(['getMe']));

    // eslint-disable-next-line no-use-before-define

    function onClose(): void {
        if (isOpen) setOpen(false);
    }

    const toggleOpen = (): void => {
        setOpen((prevState) => !prevState);
        if (!isAuth) navigate('/login ');
    };

    useOutsideClick(ref, onClose);

    return (
        <div ref={ref} className={styles.wrapper}>
            {/* eslint-disable-next-line max-len */ }
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */ }
            <div className={styles.avatarWrapper} onClick={toggleOpen}>
                {
                    isLoading ? <HeartLoadingSmall size="24px" /> : (
                        <>
                            <Avatar img={avatarIcon} size="s" className={styles.avatar} />
                            <Text className={styles.username}>
                                {
                                    user.username ? user.username : 'Гость'
                                }
                            </Text>
                        </>
                    )
                }
            </div>
            <OpacityFade show={isOpen && isAuth}>
                <div className={styles.menu}>
                    <div className={styles.menuList}>
                        {
                            profileRoutes.map(({ caption, link, icon }) => (
                                <ProfileMenuItem
                                    key={caption}
                                    caption={caption}
                                    link={link}
                                    icon={icon}
                                />
                            ))
                        }
                    </div>
                </div>
            </OpacityFade>
        </div>
    );
};

export default Profile;
