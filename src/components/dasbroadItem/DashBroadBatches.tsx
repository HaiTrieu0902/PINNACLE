import React from 'react';
import DashBroadItem from './branching/DashBroadItem';
import SubHeader from '../Header/SubHeader';
import { Pie } from '@ant-design/plots';
import { configBatchs } from '../../context/dataDashbroad';
const DashBroadBatches = () => {
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
            </DashBroadItem>
        </div>
    );
};

export default DashBroadBatches;
