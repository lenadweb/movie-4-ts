import React, { FC, useEffect, useMemo } from 'react';
import prettyBytes from 'pretty-bytes';
import Margin from 'components/utils/Margin/Margin';
import H from 'components/utils/H/H';
import axios from 'axios';
import { formatNumberThousand } from '../../../helpers/formatHelper';
import StaticTable from '../../tables/StaticTable/StaticTable';
import { API_URL, useGetTorrentsMutation } from '../../../api/BaseApi';
import Section from '../../utils/Section/Section';
import styles from './Torrents.module.css';
import HeartLoading from '../../utils/HeartLoading/HeartLoading';
import HeartLoadingSmall from '../../utils/HeartLoading/HeartLoadingSmall';
import TextButton from '../../forms/Buttons/TextButton/TextButton';
import { downloadFile } from '../../../helpers/commonHelper';

interface ITorrents {
    movieInformation: any
}

const Torrents:FC<ITorrents> = ({ movieInformation }) => {
    const [getTorrents, { isLoading, data }] = useGetTorrentsMutation();

    const onMagnetHandler = async (id:number):Promise<void> => {
        const response:any = await axios({
            method: 'GET',
            url: `${API_URL}torrents/magnet?id=${id}`,
        });
        console.log(response);
        const urlDownload = response?.data?.link;
        window.open(urlDownload);
    };

    const onDownloadHandler = async (id:number, title:string):Promise<void> => {
        const response = await axios({
            method: 'GET',
            url: `${API_URL}torrents/download?id=${id}`,
            responseType: 'blob',
        });
        const urlDownload = window.URL.createObjectURL(new Blob([response.data]));
        downloadFile(urlDownload, `${title}.torrent`);
    };

    useEffect(() => {
        if (movieInformation?.data?.filmId) getTorrents(`${movieInformation.data.nameRu} ${movieInformation.data.year}`);
    }, [movieInformation?.data?.filmId]);

    const commonValuesMl = useMemo(() => (data as Array<any>)?.map(({ title, seeds, leeches, size }:any) => ({
        col1: title,
        col2: seeds,
        col3: leeches,
        col4: size,
        col5: 'клик',
        col6: 'клик',
    })) || [], [data]);

    const commonColumnMl = useMemo(() => [
        {
            Header: 'Название',
            accessor: 'col1' as const,
        },
        {
            Header: 'Сиды',
            accessor: 'col2' as const,
            Cell: ({ value }:any) => formatNumberThousand(value),
        },
        {
            Header: 'Личи',
            accessor: 'col3' as const,
            Cell: ({ value }:any) => formatNumberThousand(value),
        },
        {
            Header: 'Размер',
            accessor: 'col4' as const,
            Cell: ({ value }:any) => prettyBytes(value),
        },
        {
            Header: 'Magnet',
            accessor: 'col5' as const,
            // eslint-disable-next-line react/no-unstable-nested-components
            Cell: ({ value, row }:any) => <TextButton caption={value} onClick={() => onMagnetHandler((data as any[])?.[row.index]?.id)} />,
        },
        {
            Header: 'Скачать',
            accessor: 'col6' as const,
            // eslint-disable-next-line react/no-unstable-nested-components
            Cell: ({ value, row }:any) => <TextButton caption={value} onClick={() => onDownloadHandler((data as any[])?.[row.index]?.id, (data as any[])?.[row.index]?.title)} />,
        },
    ], [data]);
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
