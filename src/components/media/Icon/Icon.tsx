import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Icon.module.css';
import OpacityFade from '../../utils/OpacityFade/OpacityFade';

const sizes = {
    xs: '12px',
    s: '16px',
    m: '20px',
    l: '32px',
    xl: '42px',
};

interface IIcon {
    src: string;
    size?: 'xs'|'s'|'m'|'l'|'xl';
    className?: string;
    onClick?: () => void;
    lazyLoading?: boolean;
}

const Icon: FC<IIcon> = ({ src, size = 's', className, lazyLoading = true, ...rest }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, [src]);

    return (
        <OpacityFade show={fadeIn}>
            <div
                className={cn(styles.item, className)}
                style={{
                    backgroundImage: `url(${src})`,
                    width: sizes[size],
                    height: sizes[size],
                }}
                {...rest}
            />
        </OpacityFade>

    );
};

export default Icon;
