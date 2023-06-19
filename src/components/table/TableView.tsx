import React from 'react';
import { Table, Empty } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

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
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: {},
    },
    {
        title: 'Business Importance',
        dataIndex: 'business',
        sorter: {},
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
        sorter: {},
    },
];

const TableView = () => {
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const renderEmpty = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    return <Table columns={columns} onChange={onChange} size="small" locale={{ emptyText: renderEmpty }} />;
};

export default TableView;
