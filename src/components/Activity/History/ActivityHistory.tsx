/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Activity } from '../../../types/activity';
import SearchInput from '../../Search/SearchInput';
import './ActivityHistory.scss';
interface ActivityHistoryProps {
    data: Activity[];
}

/* handle render Text tooltip in table */
const renderTextWithTooltip = (text: string) => (
    <Tooltip title={text}>
        <Typography.Text ellipsis>{text}</Typography.Text>
    </Tooltip>
);
const columns: ColumnsType<any> = [
    {
        title: 'Field',
        dataIndex: 'field',
        key: 'field',
        sorter: {
            compare: (a, b) => a.field.localeCompare(b.field),
            multiple: 3,
        },
        width: 100,
        render: renderTextWithTooltip,
        ellipsis: true,
        className: 'history-columns',
    },
    {
        title: 'Timestamp',
        dataIndex: 'timeStampString',
        key: 'timeStampString',
        sorter: {
            compare: (a, b) => a.timeStampString.localeCompare(b.timeStampString),
            multiple: 3,
        },
        render: renderTextWithTooltip,
        width: 90,
        ellipsis: true,
        className: 'history-columns',
    },
    {
        title: 'Modified By',
        dataIndex: 'modifiedBy',
        key: 'modifiedBy',
        sorter: {
            compare: (a, b) => a.modifiedBy.localeCompare(b.modifiedBy),
            multiple: 3,
        },
        render: renderTextWithTooltip,
        width: 100,
        ellipsis: true,
        className: 'history-columns',
    },
    {
        title: 'Old Value',
        dataIndex: 'oldValue',
        key: 'oldValue',
        sorter: {
            compare: (a, b) => a.newValue.localeCompare(b.newValue),
            multiple: 3,
        },
        render: renderTextWithTooltip,
        width: 130,
        ellipsis: true,
        className: 'history-columns',
    },
    {
        title: 'New Value',
        dataIndex: 'newValue',
        key: 'newValue',
        sorter: {
            compare: (a, b) => a.newValue.localeCompare(b.newValue),
            multiple: 3,
        },
        width: 130,
        render: renderTextWithTooltip,
        ellipsis: true,
        className: 'history-columns',
    },
];

const ActivityHistory = ({ data }: ActivityHistoryProps) => {
    const [valueSearch, setValueSearch] = useState<string>('');

    /* handle search Actiity History */
    const handleSearchActivityHistory = (value: string) => {
        setValueSearch(value);
    };

    /* handle filter history */
    const filteredData = valueSearch
        ? data.filter((item) => {
              return (
                  item?.field?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                  item?.oldValue?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                  item?.newValue?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                  item?.modifiedBy?.toLowerCase()?.includes(valueSearch.toLowerCase()) ||
                  item?.timeStampString?.toLowerCase()?.includes(valueSearch.toLowerCase())
              );
          })
        : data;
    return (
        <div className="history">
            <div className="history__header">
                <img
                    style={{ height: '24px', cursor: 'pointer' }}
                    src="http://pinnacle-portal.server2div3.pgtest.co/icons/reload.svg"
                    alt=""
                />
                <SearchInput onSearch={handleSearchActivityHistory} width="220px" />
            </div>
            <div className="history-table-wrapper">
                <Table
                    className="history-table"
                    pagination={false}
                    columns={columns}
                    dataSource={filteredData ? filteredData.map((item, index) => ({ ...item, key: index })) : []}
                    showSorterTooltip={true}
                />
            </div>
        </div>
    );
};

export default ActivityHistory;
