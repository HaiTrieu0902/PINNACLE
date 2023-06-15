import { Pie } from '@ant-design/plots';
import { testCaseWorkflowList } from '../../types/dashbroad';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import DashBroadCustom from './branching/DashBroadCustom';

interface DashBroadTestcaseProps {
    testCaseWorkflowList: testCaseWorkflowList;
}

const DashBroadTestcase = ({ testCaseWorkflowList }: DashBroadTestcaseProps) => {
    const handleColorTestCase = () => {
        return testCaseWorkflowList.testCaseWorkflow?.workflowItem?.map((item) => {
            return item?.backColor ? item.backColor : '';
        });
    };

    const configTestcase = {
        appendPadding: 30,
        data: testCaseWorkflowList.testCaseWorkflow.workflowItem,
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
        color: handleColorTestCase(),
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
