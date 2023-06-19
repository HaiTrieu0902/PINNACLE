import React from 'react';
import { Table, Empty } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import './table.scss';
interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'name',
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
        title: 'Business Importance',
        dataIndex: 'business',
        sorter: {},
        width: 200,
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
        sorter: {},
        width: 60,
    },
];

const TableView = () => {
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return <Table columns={columns} onChange={onChange} size="small" />;
};

export default TableView;
