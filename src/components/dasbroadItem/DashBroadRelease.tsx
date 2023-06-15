import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { Pie } from '@ant-design/plots';
import { dataRelease } from '../../context/dataDashbroad';
import DashBroadCustom from './branching/DashBroadCustom';
import { releaseWorkflowList } from '../../types/dashbroad';

interface DashBroadReleaseProps {
    releaseWorkflow: releaseWorkflowList;
}

const DashBroadRelease = ({ releaseWorkflow }: DashBroadReleaseProps) => {
    const handleColorRelease = () => {
        return releaseWorkflow.releaseWorkflow?.workflowItems?.map((item) => {
            return item?.backColor ? item.backColor : '';
        });
    };
    const configRelease = {
        appendPadding: 44,
        data: releaseWorkflow.releaseWorkflow.workflowItems,
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
        color: handleColorRelease(),
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
