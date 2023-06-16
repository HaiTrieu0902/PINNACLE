import { Column, Pie } from '@ant-design/plots';
import { columnDefect } from '../../context/dataDashbroad';
import { defectWorkflowList } from '../../types/dashbroad';
import { generatePieChartConfig } from '../../utils/dashbroadColor';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import DashBroadCustom from './branching/DashBroadCustom';

interface DashBroadDefectProps {
    defectWorkflowList: defectWorkflowList;
}

const DashBroadDefect = ({ defectWorkflowList }: DashBroadDefectProps) => {
    const configColumDefect = {
        data: columnDefect,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: false,
        columnStyle: {},
    };

    return (
        <div className="flex w-full gap-2 flex-wrap">
            <DashBroadItem width={'54%'} height="450px">
                <SubHeader title="Defect Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(defectWorkflowList.defectWorkflow?.workflowItems)} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'} height="450px">
                <SubHeader title="Defect Trend" size={14} color="black" />
                <div>
                    <Column {...configColumDefect} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'54%'} height="180px">
                <SubHeader title="Defect Risk" size={14} color="black" />
                <div className="flex mt-6 items-center justify-center gap-11">
                    {defectWorkflowList.defectRisk.map((item, index) => (
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

export default DashBroadDefect;
