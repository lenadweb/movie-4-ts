import React, { FC, useState } from 'react';
import CircleButton from 'components/forms/Buttons/CircleButton/CircleButton';
import Display from 'components/utils/Display/Display';
import cn from 'classnames';
import prevIcon from 'assets/images/arrow-prev-white.svg';
import nextIcon from 'assets/images/arrow-next.white.svg';
import styles from './HorizontalSlides.module.css';

interface IHorizontalSlides {
    items: any;
    countOnPage: number;
}

const HorizontalSlides:FC<IHorizontalSlides> = ({ items, countOnPage = 10 }) => {
    const [page, setPage] = useState(0);

    const itemsToShow = items?.slice(countOnPage * page, countOnPage * (page + 1));

    return (
        <div className={cn(styles.wrapper, {
            [styles.wrapperPadding]: !(items?.length > countOnPage),
        })}
        >
            <Display show={items?.length > countOnPage}>
                <CircleButton
                    icon={prevIcon}
                    className={styles.btnControl}
                    onClick={() => setPage((prevState) => (prevState === 0
                        ? Math.floor(items.length / countOnPage) - 1 : prevState - 1))}
                />
            </Display>
            <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${countOnPage}, 1fr)` }}>
                {itemsToShow}
            </div>
            <Display show={items?.length > countOnPage}>
                <CircleButton
                    icon={nextIcon}
                    className={styles.btnControl}
                    onClick={() => setPage((prevState) => ((prevState + 1) * countOnPage >= items.length ? 0
                        : prevState + 1))}
                />
            </Display>
        </div>
    );
};

export default HorizontalSlides;
