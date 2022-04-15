import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Actors.module.css';

const Actors:FC<{actors: any}> = ({ actors }) => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            {
                actors?.map((item: any) => (
                    <Link to={`/staff/${item.staffId}`} key={item.staffId} className={styles.actorItem}>
                        <div
                            className={styles.avatar}
                            style={{
                                backgroundImage: `url(${item.posterUrl})`,
                            }}
                        />
                        <div className={styles.caption}>
                            {
                                item.nameRu.split(' ').map((item: any) => <div key={item}>{item}</div>)
                            }
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
);

export default Actors;
