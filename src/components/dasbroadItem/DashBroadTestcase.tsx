import React from 'react';
import DashBroadItem from './branching/DashBroadItem';
import SubHeader from '../Header/SubHeader';
import { Pie } from '@ant-design/plots';
import { configTestcase } from '../../context/dataDashbroad';
const DashBroadTestcase = () => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Test Case Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configTestcase} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'}>
                <SubHeader title="Custom Test Case" size={14} color="black" />
            </DashBroadItem>
        </div>
    );
};

export default DashBroadTestcase;
