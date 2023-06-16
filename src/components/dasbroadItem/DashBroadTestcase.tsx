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
        <div className="flex w-full gap-2 flex-wrap">
            <DashBroadItem width={'54%'} height="480px">
                <SubHeader title="Test Case Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(testCaseWorkflowList.testCaseWorkflow?.workflowItem)} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'} height="480px">
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

            <DashBroadItem width={'54%'} height="190px">
                <SubHeader title="Test Case Exception" size={14} color="black" />
                <div className="flex mt-6 items-center justify-center gap-11">
                    {testCaseWorkflowList.testCaseException.map((item, index) => (
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

export default DashBroadTestcase;
