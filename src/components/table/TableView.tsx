import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React from 'react';
import { filterReleasesGridCharTable } from '../../redux/release.slice';
import { useAppDispatch } from '../../store';
import './table.scss';
interface DataType {
    key: React.Key;
    name: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: {},
        width: 60,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: {},
        width: 250,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        sorter: {},
        width: 100,
    },
    {
        title: 'Business Importance',
        dataIndex: 'businessImportance',
        sorter: {},
        width: 100,
        ellipsis: true,
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
        sorter: {},
        width: 70,
    },
];

const TableView = () => {
    const dispatch = useAppDispatch();

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        if (Array.isArray(sorter)) {
            sorter.forEach((item) => {
                dispatch(filterReleasesGridCharTable({ order: item.order, field: item.field }));
            });
        } else {
            dispatch(filterReleasesGridCharTable({ order: sorter?.order, field: sorter?.field }));
        }
    };
    return <Table columns={columns} onChange={onChange} size="small" className="table-view" />;
};

export default TableView;
