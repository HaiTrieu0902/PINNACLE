import React from 'react';
import SearchInput from '../../Search/SearchInput';
import './ActivityHistory.scss';
import Table, { ColumnsType, TableProps } from 'antd/es/table';
import { Tooltip, Typography } from 'antd';
interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: {
            compare: (a, b) => a.name.localeCompare(b.name),
            multiple: 3,
        },
        render: (text) => (
            <Tooltip title={text}>
                <Typography.Text ellipsis>{text}</Typography.Text>
            </Tooltip>
        ),

        className: 'history-columns',
    },
    {
        title: 'Chinese Score',
        dataIndex: 'chinese',
        sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
        },
        render: (text) => (
            <Tooltip title={text}>
                <Typography.Text ellipsis>{text}</Typography.Text>
            </Tooltip>
        ),
        className: 'history-columns',
    },
    {
        title: 'Math Score',
        dataIndex: 'math',
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
        render: (text) => (
            <Tooltip title={text}>
                <Typography.Text ellipsis>{text}</Typography.Text>
            </Tooltip>
        ),
        className: 'history-columns',
    },
    {
        title: 'English Score',
        dataIndex: 'english',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
        render: (text) => (
            <Tooltip title={text}>
                <Typography.Text ellipsis>{text}</Typography.Text>
            </Tooltip>
        ),
        className: 'history-columns',
    },
];
const ActivityHistory = () => {
    // const columns: ColumnsType<DataType> = [
    //     {
    //         title: 'ID',
    //         dataIndex: 'id',
    //         sorter: {},
    //         width: 60,
    //     },
    //     {
    //         title: 'Title',
    //         dataIndex: 'title',
    //         sorter: {},
    //         width: 250,
    //     },
    //     {
    //         title: 'Type',
    //         dataIndex: 'type',
    //         sorter: {},
    //         width: 100,
    //     },
    //     {
    //         title: 'Business Importance',
    //         dataIndex: 'businessImportance',
    //         sorter: {},
    //         width: 100,
    //         ellipsis: true,
    //     },
    //     {
    //         title: 'Owner',
    //         dataIndex: 'owner',
    //         sorter: {},
    //         width: 70,
    //     },
    // ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className="history">
            <div className="history__header">
                <img
                    style={{ height: '24px', cursor: 'pointer' }}
                    src="http://pinnacle-portal.server2div3.pgtest.co/icons/reload.svg"
                    alt=""
                />
                <SearchInput
                    onSearch={() => {
                        return;
                    }}
                    width="220px"
                />
            </div>
            <div>
                <Table
                    className="history-table"
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={true}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default ActivityHistory;
