import type { CollapseProps } from 'antd';
import { Collapse, Radio, Table } from 'antd';
import './table.scss';
import { useState } from 'react';
interface TableItem {
    key: React.Key;
    id: number;
    name: string;
    description: string;
    selected?: boolean;
}

const initialTableData: TableItem[] = [
    { id: 1, name: 'Dog', description: 'A type of domesticated animal.', key: '1' },
    { id: 2, name: 'Cat', description: 'A small, .', key: '2' },
    { id: 3, name: 'Bird', description: 'A warm-b', key: '3' },
];

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Name', dataIndex: 'name', key: 'name', width: 250 },
    { title: 'Description', dataIndex: 'description', key: 'description', width: 200 },
];

const TableData: React.FC = () => {
    const [selectedRow, setSelectedRow] = useState<number | undefined>(0);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'This is panel header 1',
            children: (
                <Table<TableItem>
                    className="custom-table-data"
                    dataSource={initialTableData}
                    columns={columns}
                    showHeader={false}
                    pagination={false}
                    rowClassName={(record, index) => (index === selectedRow ? 'active-row' : '')}
                    onRow={(record, index) => {
                        return {
                            onClick: () => {
                                setSelectedRow(index);
                            },
                        };
                    }}
                />
            ),
        },
        {
            key: '2',
            label: 'This is panel header 2',
            children: (
                <Table<TableItem>
                    className="custom-table-data"
                    dataSource={initialTableData}
                    columns={columns}
                    showHeader={false}
                    pagination={false}
                    rowClassName={(record, index) => (index === selectedRow ? 'active-row' : '')}
                    onRow={(record, index) => {
                        return {
                            onClick: () => {
                                setSelectedRow(index);
                            },
                        };
                    }}
                />
            ),
        },
        {
            key: '3',
            label: 'This is panel header 3',
            children: (
                <Table<TableItem>
                    className="custom-table-data"
                    dataSource={initialTableData}
                    columns={columns}
                    showHeader={false}
                    pagination={false}
                    rowClassName={(record, index) => (index === selectedRow ? 'active-row' : '')}
                    onRow={(record, index) => {
                        return {
                            onClick: () => {
                                setSelectedRow(index);
                            },
                        };
                    }}
                />
            ),
        },
    ];

    return (
        <Collapse
            className="custom-table-collapse"
            items={items}
            defaultActiveKey={['1']}
            onChange={onChange}
            size={'small'}
        />
    );
};

export default TableData;
