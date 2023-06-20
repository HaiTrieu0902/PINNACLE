import type { CollapseProps } from 'antd';
import { Collapse, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getReleaseChart } from '../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import './table.scss';
interface TableItem {
    key: React.Key;
    id: number;
    name: string;
    description: string;
    selected?: boolean;
}

const initialTableData: TableItem[] = [
    { id: 1, name: 'Dog', description: 'A type of domesticated animal sadasdsadsadsad.', key: '1' },
    { id: 2, name: 'Cat', description: 'A small, .', key: '2' },
    { id: 3, name: 'Bird', description: 'A warm-b', key: '3' },
];

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Name', dataIndex: 'name', key: 'name', width: 250 },
    { title: 'Description', dataIndex: 'description', key: 'description', width: 200 },
];

const TableData: React.FC = () => {
    const dispatch = useAppDispatch();
    const { releasesGridChartList } = useAppSelector((state) => state.release);
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

    useEffect(() => {
        const releaseChart = dispatch(getReleaseChart());

        return () => {
            releaseChart.abort();
        };
    }, [dispatch]);

    console.log(
        'releasesGridChartList',
        releasesGridChartList.releasesGridChart.map((item, index) => {
            return item;
        }),
    );

    const mappedItems = releasesGridChartList.releasesGridChart.map((item, index) => {
        return {
            key: String(index),
            label: item.folderGrid.folderNameShow,
            children: (
                <Table<TableItem>
                    className="custom-table-data"
                    dataSource={initialTableData}
                    columns={columns}
                    showHeader={false}
                    pagination={false}
                    rowClassName={(record, rowIndex) => (rowIndex === selectedRow ? 'active-row' : '')}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setSelectedRow(rowIndex);
                            },
                        };
                    }}
                />
            ),
        };
    });

    return (
        <Collapse
            style={{ height: '69vh' }}
            className="custom-table-collapse"
            items={mappedItems}
            defaultActiveKey={['1']}
            onChange={onChange}
            size={'small'}
        />
    );
};

export default TableData;

// [
//     {
//         folderGrid: {
//             folderName: null,
//             folderNameShow: 'Path : ',
//             folderId: 0,
//             parentFolderId: null,
//         },
//         releaseGridDtos: [
//             {
//                 id: 373,
//                 title: 'add new  1 release 12 : 15/12/2022 2 21',
//                 type: 'Green-Field Implementation',
//                 businessImportance: '5-Unimportant',
//                 businessImportanceId: 0,
//                 folderId: 0,
//                 owner: 'Hang Duong',
//                 releaseParentId: null,
//             },
//             {
//                 id: 389,
//                 title: '     PGA 32 :         1113    233223',
//                 type: 'Green-Field Implementation',
//                 businessImportance: '2-Very Important',
//                 businessImportanceId: 0,
//                 folderId: 0,
//                 owner: 'Ian Charlton',
//                 releaseParentId: null,
//             },
//         ],
//     },
//     {
//         folderGrid: {
//             folderName: null,
//             folderNameShow: 'Path : ABC > DEF > abc',
//             folderId: 0,
//             parentFolderId: null,
//         },
//         releaseGridDtos: [
//             {
//                 id: 396,
//                 title: 'new release2 : abc121',
//                 type: 'Migration',
//                 businessImportance: '3-Somewhat Important',
//                 businessImportanceId: 0,
//                 folderId: 0,
//                 owner: 'Ian Charlton',
//                 releaseParentId: null,
//             },
//         ],
//     },
//     {
//         folderGrid: {
//             folderName: null,
//             folderNameShow: 'Path : Christmas',
//             folderId: 0,
//             parentFolderId: null,
//         },
//         releaseGridDtos: [
//             {
//                 id: 42,
//                 title: 'PLM 6.0.5 : Paperless Maintainer Release 6.0.5.0',
//                 type: 'Single Interface',
//                 businessImportance: '2-Very Important',
//                 businessImportanceId: 0,
//                 folderId: 0,
//                 owner: 'Ian Charlton',
//                 releaseParentId: null,
//             },
//             {
//                 id: 351,
//                 title: 'add new : release  2121 aaa',
//                 type: 'Security Patch/Enhancement',
//                 businessImportance: '2-Very Important',
//                 businessImportanceId: 0,
//                 folderId: 0,
//                 owner: 'Ian Charlton',
//                 releaseParentId: null,
//             },
//         ],
//     },
// ];
