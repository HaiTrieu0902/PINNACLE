import { Column, Pie } from '@ant-design/plots';
import { deepMix } from '@antv/util';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { batchWorkflowDashboardList } from '../../types/dashbroad';
import { handleColorWorkflowItems } from '../../utils/dashbroadColor';

interface DashBroadBatchesProps {
    batchWorkflowDashboardList: batchWorkflowDashboardList;
}

const DashBroadBatches = ({ batchWorkflowDashboardList }: DashBroadBatchesProps) => {
    const [data, setData] = useState([]);
    const configBatchs = {
        appendPadding: 30,
        data: batchWorkflowDashboardList.batchWorkflowDashboard?.workflowItem,
        angleField: 'value',
        colorField: 'text',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            autoRotate: false,
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        color: handleColorWorkflowItems(batchWorkflowDashboardList.batchWorkflowDashboard?.workflowItem),
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const configColumBatches = {
        appendPadding: 5,
        autoFit: true,
        data,
        xField: '城市',
        yField: '销售额',
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        theme: deepMix(
            {},
            {
                components: {
                    scrollbar: {
                        default: {
                            style: {
                                trackColor: '#002060',
                                thumbColor: '#8c8c8c',
                            },
                        },
                        hover: {
                            style: {
                                thumbColor: 'rgba(255,255,255,0.6)',
                            },
                        },
                    },
                },
            },
        ),
        scrollbar: {
            type: 'horizontal' as 'horizontal' | 'vertical' | undefined,
        },
    };

    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Batch Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configBatchs} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'}>
                <SubHeader title="Test Daily Frequency" size={14} color="black" />
                <div>
                    <div className="dashbroad-datepicker flex justify-between mb-10 mt-3">
                        <div className="flex gap-4 items-center">
                            <span>Form: </span>
                            <DatePicker
                                defaultValue={dayjs(new Date().toISOString(), 'YYYY-MM-DD')}
                                format={'YYYY-MM-DD'}
                            />
                        </div>
                        <div className="flex gap-4 items-center">
                            <span>To: </span>
                            <DatePicker
                                defaultValue={dayjs(new Date().toISOString(), 'YYYY-MM-DD')}
                                format={'YYYY-MM-DD'}
                            />
                        </div>
                    </div>
                    <Column {...configColumBatches} style={{ width: '100%', height: '320px' }} />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadBatches;
