/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collapse, Table, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getReleaseChart, getReleaseDetail, getreleaseId } from '../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../store';

import './table.scss';
import { ColumnsType } from 'antd/es/table';

// eslint-disable-next-line react-refresh/only-export-components
const columnsTableData: ColumnsType<any> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 60,
        showSorterTooltip: true,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 250,
        ellipsis: true,
    },
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
    const { releasesGridChartList, conditionSorter } = useAppSelector((state) => state.release);
    const [selectedRow, setSelectedRow] = useState<number | undefined>(releasesGridChartList.lastestReleaseId);

    // call API
    useEffect(() => {
        const releaseChart = dispatch(getReleaseChart());
        return () => {
            releaseChart.abort();
        };
    }, [dispatch]);

    // Change the selectedRow
    useEffect(() => {
        setSelectedRow(releasesGridChartList.lastestReleaseId);
    }, [releasesGridChartList.lastestReleaseId]);

    // change value Id release details
    useEffect(() => {
        if (Number(selectedRow) != 0) {
            dispatch(getReleaseDetail(Number(selectedRow)));
            dispatch(getreleaseId(Number(selectedRow)));
        }
    }, [dispatch, selectedRow]);

    const mappedItems = releasesGridChartList.releasesGridChart.map((item, index) => {
        let dataSource = item.releaseGridDtos.map((releaseItem) => ({
            ...releaseItem,
            key: releaseItem.id,
        }));

        if (conditionSorter.field && conditionSorter.order) {
            const { field, order } = conditionSorter;
            dataSource = dataSource.sort((a, b) => {
                const valueA = a[field as keyof typeof a];
                const valueB = b[field as keyof typeof b];
                if (valueA && valueB) {
                    if (valueA < valueB) {
                        return order === 'ascend' ? -1 : 1;
                    }
                    if (valueA > valueB) {
                        return order === 'ascend' ? 1 : -1;
                    }
                }
                return 0;
            });
        } else {
            dataSource = dataSource.sort((a, b) => a.id - b.id);
        }
        return {
            key: String(index),
            label: item.folderGrid.folderNameShow,
            children: (
                <Table
                    className="custom-table-data"
                    dataSource={dataSource}
                    columns={columnsTableData}
                    showHeader={false}
                    pagination={false}
                    rowClassName={(record) => (record.id === selectedRow ? 'active-row' : '')}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                // console.log('record', record);
                                setSelectedRow(record.id);
                            },
                        };
                    }}
                />
            ),
        };
    });

    return (
        <Collapse
            // style={{ height: '69vh' }}
            className="custom-table-collapse"
            items={mappedItems}
            defaultActiveKey={['0']}
            size={'small'}
        />
    );
};

export default TableData;
