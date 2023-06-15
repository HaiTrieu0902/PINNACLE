import React from 'react';
import DashBroadItem from './branching/DashBroadItem';
import SubHeader from '../Header/SubHeader';
import { Pie } from '@ant-design/plots';
import { configTestcase } from '../../context/dataDashbroad';
import DashBroadCustom from './branching/DashBroadCustom';
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
                <div className="ml-8 mt-9 flex flex-col gap-8">
                    <DashBroadCustom
                        color="#64BFE8"
                        bgColor="rgba(100, 191, 232, 0.1)"
                        value="44"
                        title="Not executed"
                    />
                    <DashBroadCustom
                        color="#739EF9"
                        bgColor="rgba(115, 158, 249, 0.1)"
                        value="15"
                        title="Failed when last executed"
                    />
                    <DashBroadCustom
                        color="#F2B41C"
                        bgColor="rgba(242, 180, 28, 0.1)"
                        value="90"
                        title="Blocked when last executed"
                    />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadTestcase;
