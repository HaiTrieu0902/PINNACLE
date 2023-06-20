import type { CollapseProps } from 'antd';
import { Collapse, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getReleaseChart } from '../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import './table.scss';

const columns = [
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

const TableData: React.FC = () => {
    const dispatch = useAppDispatch();
    const { releasesGridChartList } = useAppSelector((state) => state.release);
    const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    useEffect(() => {
        const releaseChart = dispatch(getReleaseChart());

        return () => {
            releaseChart.abort();
        };
    }, [dispatch]);

    const mappedItems = releasesGridChartList.releasesGridChart.map((item, index) => {
        const dataSource = item.releaseGridDtos.map((releaseItem) => ({
            ...releaseItem,
            key: releaseItem.id,
        }));
        return {
            key: String(index),
            label: item.folderGrid.folderNameShow,
            children: (
                <Table
                    className="custom-table-data"
                    dataSource={dataSource}
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
            defaultActiveKey={['0']}
            onChange={onChange}
            size={'small'}
        />
    );
};

export default TableData;
