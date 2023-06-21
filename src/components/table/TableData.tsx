import { Collapse, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getReleaseChart } from '../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import './table.scss';
import { columnsTableData } from '../../utils/releaseTable';

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
                                console.log('record', record);
                                setSelectedRow(record.id);
                            },
                        };
                    }}
                />
            ),
        };
    });

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <Collapse
            // style={{ height: '69vh' }}
            className="custom-table-collapse"
            items={mappedItems}
            defaultActiveKey={['0']}
            onChange={onChange}
            size={'small'}
        />
    );
};

export default TableData;
