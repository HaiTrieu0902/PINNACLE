import { Pie } from '@ant-design/plots';
import { generatePieChartConfig } from '../../utils/dashbroadColor';
import SubHeader from '../Header/SubHeader';
import { requirementWorkflowList } from './../../types/dashbroad';
import DashBroadItem from '../DasbroadItem/Branching/DashBroadItem';
import DashBroadCustom from '../DasbroadItem/Branching/DashBroadCustom';

interface DashBroadRequimentProps {
    requirementWorkflowList: requirementWorkflowList;
}

const DashBroadRequiment = ({ requirementWorkflowList }: DashBroadRequimentProps) => {
    return (
        <div className="flex w-full gap-2 flex-wrap">
            <DashBroadItem width={'54%'} height="480px">
                <SubHeader title="Requirement Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(requirementWorkflowList.requirementWorkflow?.workflowItems)} />
                </div>
            </DashBroadItem>
            <DashBroadItem width={'45%'} height="480px">
                <SubHeader title="Custom Requirement" size={14} color="black" />
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

            <DashBroadItem width={'54%'} height="190px">
                <SubHeader title="Requirement Risk" size={14} color="black" />
                <div className="flex mt-6 items-center justify-center gap-11">
                    {requirementWorkflowList.requirementRisk.map((item, index) => (
                        <DashBroadCustom
                            key={index}
                            color={String(item.backColor)}
                            value={String(item.value)}
                            title={item.text}
                            direction="column"
                        />
                    ))}
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadRequiment;
