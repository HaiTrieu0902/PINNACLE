import { Pie } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { configBatchs } from '../../context/dataDashbroad';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
const DashBroadBatches = () => {
    const data = [
        {
            type: '13/6',
            value: 100,
        },
        {
            type: '14/6',
            value: 250,
        },
        {
            type: '15/6',
            value: 134,
        },
        {
            type: '17/6',
            value: 64,
        },
        {
            type: '18/6',
            value: 230,
        },
        {
            type: '19/6',
            value: 250,
        },
        {
            type: '20/6',
            value: 160,
        },
        {
            type: '21/6',
            value: 122,
        },
    ];

    const config = {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: '',
        color: '#6C63F0',
        label: {
            fields: ['value'],
            offset: 10,
        },
        legend: false || undefined,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
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
                    <Column {...config} />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadBatches;
