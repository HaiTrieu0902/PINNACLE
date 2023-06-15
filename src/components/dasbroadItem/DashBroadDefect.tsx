import { Pie } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { useEffect, useState } from 'react';
import { columnDefect } from '../../context/dataDashbroad';
import { defectWorkflowList } from '../../types/dashbroad';
import { handleColorWorkflowItems } from '../../utils/dashbroadColor';

interface DashBroadDefectProps {
    defectWorkflowList: defectWorkflowList;
}

const DashBroadDefect = ({ defectWorkflowList }: DashBroadDefectProps) => {
    const configDefects = {
        appendPadding: 30,
        data: defectWorkflowList.defectWorkflow?.workflowItems,
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
        color: handleColorWorkflowItems(defectWorkflowList.defectWorkflow?.workflowItems),
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };

    const configColumDefect = {
        data: columnDefect,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: false,
        columnStyle: {},
    };

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
                <div>
                    <Column {...configColumDefect} />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadDefect;
