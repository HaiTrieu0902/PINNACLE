import { Pie } from '@ant-design/plots';
import { testCaseWorkflowList } from '../../types/dashbroad';
import { handleColorWorkflowItems } from '../../utils/dashbroadColor';
import SubHeader from '../Header/SubHeader';
import DashBroadCustom from './branching/DashBroadCustom';
import DashBroadItem from './branching/DashBroadItem';

interface DashBroadTestcaseProps {
    testCaseWorkflowList: testCaseWorkflowList;
}

const DashBroadTestcase = ({ testCaseWorkflowList }: DashBroadTestcaseProps) => {
    const configTestcase = {
        appendPadding: 30,
        data: testCaseWorkflowList.testCaseWorkflow?.workflowItem,
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
        color: handleColorWorkflowItems(testCaseWorkflowList.testCaseWorkflow?.workflowItem),
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
                <SubHeader title="Test Case Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configTestcase} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'}>
                <SubHeader title="Custom Test Case" size={14} color="black" />
                <div className="ml-8 mt-9 flex flex-col gap-8">
                    {testCaseWorkflowList.testCaseCustom.map((testCase, index) => {
                        return (
                            <DashBroadCustom
                                key={index}
                                color={String(testCase.backColor)}
                                value={String(testCase.value)}
                                title={testCase.text}
                            />
                        );
                    })}
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadTestcase;
