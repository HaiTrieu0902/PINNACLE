import DashBroadItem from './branching/DashBroadItem';
import SubHeader from '../Header/SubHeader';
import { Pie } from '@ant-design/plots';

import { requirementWorkflowList } from './../../types/dashbroad';
import DashBroadCustom from './branching/DashBroadCustom';
import { handleColorWorkflowItems } from '../../utils/dashbroadColor';

interface DashBroadRequimentProps {
    requirementWorkflowList: requirementWorkflowList;
}

const DashBroadRequiment = ({ requirementWorkflowList }: DashBroadRequimentProps) => {
    const configRequiment = {
        appendPadding: 30,
        data: requirementWorkflowList.requirementWorkflow?.workflowItems,
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
        color: handleColorWorkflowItems(requirementWorkflowList.requirementWorkflow?.workflowItems),
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };

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
                    {requirementWorkflowList.requirementCustom.map((item, index) => (
                        <DashBroadCustom
                            key={index}
                            color={String(item.backColor)}
                            value={String(item.value)}
                            title={item.text}
                        />
                    ))}
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadRequiment;
