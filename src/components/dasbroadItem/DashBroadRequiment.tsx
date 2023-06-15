import React from 'react';
import DashBroadItem from './branching/DashBroadItem';
import SubHeader from '../Header/SubHeader';
import { Pie } from '@ant-design/plots';
import { configRequiment } from '../../context/dataDashbroad';
import DashBroadCustom from './branching/DashBroadCustom';
const DashBroadRequiment = () => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Requiment Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configRequiment} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'}>
                <SubHeader title="Custom Requiment" size={14} color="black" />
                <div className="ml-8 mt-10 flex flex-col gap-8">
                    <DashBroadCustom
                        color="#64BFE8"
                        bgColor="rgba(100, 191, 232, 0.1)"
                        value="44"
                        title="Uncovered Requirement (i.e not linked to any tests)"
                    />

                    <DashBroadCustom
                        color="#F2B41C"
                        bgColor="rgba(242, 180, 28, 0.1)"
                        value="90"
                        title="Blocked Requirements"
                    />
                    <DashBroadCustom
                        color="#71C09A"
                        bgColor="rgba(113, 192, 154, 0.1)"
                        value="88"
                        title="Failed Requirements"
                    />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadRequiment;
