import { Pie } from '@ant-design/plots';
import { Column, G2 } from '@ant-design/plots';
import { deepMix } from '@antv/util';
import { configBatchs } from '../../context/dataDashbroad';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { useEffect, useState } from 'react';
const DashBroadBatches = () => {
    const [data, setData] = useState([]);
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
                    <Column {...configColumBatches} />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadBatches;
