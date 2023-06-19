import type { CollapseProps } from 'antd';
import { Collapse, Table } from 'antd';
import './table.scss';

const tableData = [
    { id: 1, name: 'Dog', description: 'A type of domesticated animal.' },
    { id: 2, name: 'Cat', description: 'A small, typically furry, carnivorous mammal.' },
    { id: 3, name: 'Bird', description: 'A warm-blooded vertebrate with feathers.' },
];

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Name', dataIndex: 'name', key: 'name', width: 250 },
    { title: 'Description', dataIndex: 'description', key: 'description', width: 200 },
];

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: (
            <Table
                key="table-1"
                className="custom-table-data"
                dataSource={tableData}
                columns={columns}
                showHeader={false}
                pagination={false}
            />
        ),
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: (
            <Table
                key="table-2"
                className="custom-table-data"
                showHeader={false}
                dataSource={tableData}
                columns={columns}
                pagination={false}
            />
        ),
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: (
            <Table
                key="table-3"
                className="custom-table-data"
                showHeader={false}
                dataSource={tableData}
                columns={columns}
                pagination={false}
            />
        ),
    },
];

const TableData = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

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
