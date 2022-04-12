import React, { FC } from 'react';
import { Column, useSortBy, useTable } from 'react-table';
import styles from '../Tables.module.css';

interface IStaticTable {
    columns: any;
    data: any;
    initialState?:any
}

const StaticTable:FC<IStaticTable> = ({ columns, data, initialState = {} }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState,
        },
        useSortBy,
    );

    return (
        <div className={styles.wrapper}>
            <table {...getTableProps()} className={styles.table}>
                <thead className={styles.head}>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={styles.cell}
                                >
                                    <div className={styles.headSortCell}>
                                        {column.render('Header')}
                                        <div className={styles.arrowSort}>
                                            {/* eslint-disable-next-line no-nested-ternary */}
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? '↓'
                                                    : '↑'
                                                : ''}
                                        </div>
                                    </div>

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className={styles.body}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className={styles.row}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className={styles.cell}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StaticTable;
