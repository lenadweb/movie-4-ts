import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '@/api/API';
import styles from './Torrents.module.css';

const Torrents = ({ movieInformation, onClose }) => {
    const dispatch = useDispatch();
    const torrents = useSelector((state) => state.movies.torrents);

    useEffect(async () => {
        await API.getYTSTorrent(movieInformation.externalId.imdbId);
    }, []);

    console.log(torrents);

    return (
        <div className={styles.container} onClick={onClose}>
            <div className={styles.inner}>
                <div className={styles.torrentItem}>
                    <div>Название</div>
                    <div>Тип</div>
                    <div>Качество</div>
                    <div>Размер</div>
                    <div>Озвучка</div>
                    <div>Сиды</div>
                </div>
                {
                    torrents.map((item, index) => (
                        <a
                            className={styles.torrentItem}
                            key={index}
                            href={`${item?.url}`}
                            target="_blank"
                            download
                            rel="noreferrer"
                        >
                            <div>{movieInformation.data.nameEn}</div>
                            <div>{item.type}</div>
                            <div>{item.quality}</div>
                            <div>{item.size}</div>
                            <div>En</div>
                            <div>{item.seeds}</div>
                        </a>
                    ))
                }
            </div>
        </div>
    );
};

export default Torrents;
