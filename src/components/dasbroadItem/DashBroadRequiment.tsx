import { Pie } from '@ant-design/plots';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { generatePieChartConfig } from '../../utils/dashbroadColor';
import { requirementWorkflowList } from './../../types/dashbroad';
import DashBroadCustom from './branching/DashBroadCustom';

interface DashBroadRequimentProps {
    requirementWorkflowList: requirementWorkflowList;
}

const DashBroadRequiment = ({ requirementWorkflowList }: DashBroadRequimentProps) => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Requiment Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(requirementWorkflowList.requirementWorkflow?.workflowItems)} />
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
