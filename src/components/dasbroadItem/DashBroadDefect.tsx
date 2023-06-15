import { Pie } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { useEffect, useState } from 'react';
import { columnDefect } from '../../context/dataDashbroad';
import { defectWorkflowList } from '../../types/dashbroad';
import { generatePieChartConfig, handleColorWorkflowItems } from '../../utils/dashbroadColor';

interface DashBroadDefectProps {
    defectWorkflowList: defectWorkflowList;
}

const DashBroadDefect = ({ defectWorkflowList }: DashBroadDefectProps) => {
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
                    <Pie {...generatePieChartConfig(defectWorkflowList.defectWorkflow?.workflowItems)} />
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
