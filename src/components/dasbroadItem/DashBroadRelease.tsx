import { Pie } from '@ant-design/plots';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { releaseWorkflowList } from '../../types/dashbroad';
import { handleColorWorkflowItems } from '../../utils/dashbroadColor';
import DashBroadCustom from './branching/DashBroadCustom';

interface DashBroadReleaseProps {
    releaseWorkflow: releaseWorkflowList;
}

const DashBroadRelease = ({ releaseWorkflow }: DashBroadReleaseProps) => {
    const configRelease = {
        appendPadding: 30,
        data: releaseWorkflow.releaseWorkflow?.workflowItems,
        angleField: 'value',
        colorField: 'text',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            autoRotate: false,
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        color: handleColorWorkflowItems(releaseWorkflow.releaseWorkflow?.workflowItems),
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
                <SubHeader title="Release Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configRelease} />
                </div>
            </DashBroadItem>
            <DashBroadItem width={'45%'}>
                <SubHeader title="Custom Release" size={14} color="black" />
                <div className="ml-8 mt-8 flex flex-col gap-8">
                    {releaseWorkflow.releaseCustom.map((release, index) => (
                        <DashBroadCustom
                            key={index}
                            color={String(release.backColor)}
                            value={String(release.value)}
                            title={release.text}
                        />
                    ))}
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadRelease;
