import { ColumnsType } from 'antd/es/table';

export const columnsTableData: ColumnsType<any> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Title', dataIndex: 'title', key: 'title', width: 250, ellipsis: true },
    { title: 'Type', dataIndex: 'type', key: 'type', width: 100, ellipsis: true },
    {
        title: 'Business Importance',
        dataIndex: 'businessImportance',
        key: 'businessImportance',
        width: 100,
        ellipsis: true,
    },
    { title: 'Owner', dataIndex: 'owner', key: 'owner', width: 70, ellipsis: true },
];
