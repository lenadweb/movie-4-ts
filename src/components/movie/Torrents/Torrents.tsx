import React, { FC, useEffect, useMemo, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import Margin from 'components/utils/Margin/Margin';
import H from 'components/utils/H/H';
import axios from 'axios';
import downloadIcon from 'assets/images/download.svg';
import { formatNumberThousand } from '../../../helpers/formatHelper';
import StaticTable from '../../tables/StaticTable/StaticTable';
import { API_URL, useGetTorrentsMutation } from '../../../api/BaseApi';
import Section from '../../utils/Section/Section';
import styles from './Torrents.module.css';
import HeartLoadingSmall from '../../utils/HeartLoading/HeartLoadingSmall';
import { downloadFile } from '../../../helpers/commonHelper';
import Icon from '../../media/Icon/Icon';
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner';

interface ITorrents {
    filmId: number;
    request: string;
}

const Torrents:FC<ITorrents> = ({ filmId, request }) => {
    const [getTorrents, { isLoading, data }] = useGetTorrentsMutation();
    const [torrentIndexLoading, setTorrentIndexLoading] = useState<number | null>(null);

    const onDownloadHandler = async (id:number, title:string, index: number):Promise<void> => {
        setTorrentIndexLoading(index);
        const response = await axios({
            method: 'GET',
            url: `${API_URL}torrents/download?id=${id}&filename=${filmId}.torrent`,
            responseType: 'blob',
        });
        const urlDownload = window.URL.createObjectURL(new Blob([response.data]));
        downloadFile(urlDownload, `${title}.torrent`);
        setTorrentIndexLoading(null);
    };

    const commonValuesMl = useMemo(() => (data as Array<any>)?.map(({ title, seeds, leeches, size }:any) => ({
        col1: title,
        col2: seeds,
        col3: leeches,
        col4: size,
        col5: 'RT',
        col6: 'скачать',
    })) || [], [data]);

    const commonColumnMl = useMemo(() => [
        {
            Header: 'Название',
            accessor: 'col1' as const,
        },
        {
            Header: 'Сиды',
            accessor: 'col2' as const,
            Cell: ({ value }:any) => <div className={styles.textCenter}>{formatNumberThousand(value)}</div>,
        },
        {
            Header: 'Личи',
            accessor: 'col3' as const,
            Cell: ({ value }:any) => <div className={styles.textCenter}>{formatNumberThousand(value)}</div>,
        },
        {
            Header: 'Размер',
            accessor: 'col4' as const,
            Cell: ({ value }:any) => <div className={styles.textCenter}>{prettyBytes(value)}</div>,
        },
        {
            Header: 'Источник',
            accessor: 'col5' as const,
            Cell: ({ value }:any) => <div className={styles.textCenter}>{value}</div>,
        },
        {
            Header: 'Скачать',
            accessor: 'col6' as const,
            Cell: ({ value, row, ...rest }:any) => (
                <LoadingSpinner loaded={!(row.index === torrentIndexLoading)}>
                    <Icon
                        src={downloadIcon}
                        className={styles.downloadBtn}
                        size="xs"
                        onClick={() => onDownloadHandler((data as any[])?.[row.index]?.id, (data as any[])?.[row.index]?.title, row.index)}
                    />
                </LoadingSpinner>
            ),
        },
    ], [data, torrentIndexLoading]);

    useEffect(() => {
        if (filmId) getTorrents(request);
    }, [filmId]);

    return (
        <Section className={styles.wrapper}>
            <div className={styles.scroll}>
                <Margin margin="0 0 16px 0">
                    <H size="m">Торренты</H>
                </Margin>
                {
                    isLoading
                        ? (
                            <div className={styles.loading}>
                                <HeartLoadingSmall size="50px" />
                            </div>
                        )
                        : (
                            <StaticTable
                                initialState={{
                                    sortBy: [
                                        {
                                            id: 'col2',
                                            desc: true,
                                        },
                                    ],
                                }}
                                columns={commonColumnMl}
                                data={commonValuesMl}
                            />
                        )
                }
            </div>
        </Section>
    );
};

export default Torrents;
