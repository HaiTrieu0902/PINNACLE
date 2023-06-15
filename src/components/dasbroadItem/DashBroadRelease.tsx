import { Pie } from '@ant-design/plots';
import { releaseWorkflowList } from '../../types/dashbroad';
import { generatePieChartConfig } from '../../utils/dashbroadColor';
import SubHeader from '../Header/SubHeader';
import DashBroadCustom from './branching/DashBroadCustom';
import DashBroadItem from './branching/DashBroadItem';

interface DashBroadReleaseProps {
    releaseWorkflow: releaseWorkflowList;
}

const DashBroadRelease = ({ releaseWorkflow }: DashBroadReleaseProps) => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Release Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(releaseWorkflow.releaseWorkflow?.workflowItems)} />
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
