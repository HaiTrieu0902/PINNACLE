import React from 'react';
import DashBroadItem from './branching/DashBroadItem';
import SubHeader from '../Header/SubHeader';
import { Pie } from '@ant-design/plots';
import { configDefects } from '../../context/dataDashbroad';
const DashBroadDefect = () => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Requiment Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configDefects} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'}>
                <SubHeader title="Defect Trend" size={14} color="black" />
            </DashBroadItem>
        </div>
    );
};

export default DashBroadDefect;
