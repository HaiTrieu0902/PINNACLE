import { Pie } from '@ant-design/plots';
import { testCaseWorkflowList } from '../../types/dashbroad';
import { generatePieChartConfig } from '../../utils/dashbroadColor';
import SubHeader from '../Header/SubHeader';
import DashBroadCustom from './branching/DashBroadCustom';
import DashBroadItem from './branching/DashBroadItem';

interface DashBroadTestcaseProps {
    testCaseWorkflowList: testCaseWorkflowList;
}

const DashBroadTestcase = ({ testCaseWorkflowList }: DashBroadTestcaseProps) => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Test Case Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(testCaseWorkflowList.testCaseWorkflow?.workflowItem)} />
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
