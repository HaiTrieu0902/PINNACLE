import { Column, Pie } from '@ant-design/plots';
import { deepMix } from '@antv/util';
import { useEffect, useState } from 'react';
import { getdefectTrendWorkflow } from '../../redux/dashbroad.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { defectWorkflowList } from '../../types/dashbroad';
import { generatePieChartConfig } from '../../utils/dashbroadColor';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from '../DasbroadItem/Branching/DashBroadItem';
import DashBroadCustom from '../DasbroadItem/Branching/DashBroadCustom';

import { Select } from 'antd';

interface DashBroadDefectProps {
    defectWorkflowList: defectWorkflowList;
}

const DashBroadDefect = ({ defectWorkflowList }: DashBroadDefectProps) => {
    const dispatch = useAppDispatch();
    const { defectTrendWorkList } = useAppSelector((state) => state.dashbroad);
    const [valueDate, setValueDate] = useState('1');
    const handleColorColumnDefection = () => {
        const uniqueColors = [...new Set(defectTrendWorkList?.map((item) => (item.backColor ? item.backColor : '')))];
        return uniqueColors;
    };
    useEffect(() => {
        const defectTrendWorkflow = dispatch(getdefectTrendWorkflow(valueDate));
        return () => {
            defectTrendWorkflow.abort();
        };
    }, [dispatch, valueDate]);

    console.log('loggg', defectTrendWorkList);

    const configColumDefect = {
        data: defectTrendWorkList,
        xField: 'dateCurrentString',
        yField: 'totalDefect',
        seriesField: 'serverityName',
        groupField: 'serverity',
        color: handleColorColumnDefection(),
        isStack: true,
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        theme: deepMix(
            {},
            {
                components: {
                    scrollbar: {
                        default: {
                            style: {
                                trackColor: '#002060',
                                thumbColor: '#8c8c8c',
                            },
                        },
                        hover: {
                            style: {
                                thumbColor: 'rgba(255,255,255,0.6)',
                            },
                        },
                    },
                },
            },
        ),
        scrollbar: {
            type: 'horizontal' as 'horizontal' | 'vertical' | undefined,
        },
        legend: {
            position: 'top-right' as const,
        },
    };

    const handleChangeSelect = (value: string) => {
        setValueDate(value);
    };

    return (
        <div className="flex w-full gap-2 flex-wrap">
            <DashBroadItem width={'54%'} height="480px">
                <SubHeader title="Defect Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(defectWorkflowList.defectWorkflow?.workflowItems)} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'} height="480px">
                <SubHeader title="Defect Trend" size={14} color="black" />
                <div>
                    <div className="mt-2 mb-2">
                        <Select
                            defaultValue="Today"
                            style={{ width: 140 }}
                            onChange={handleChangeSelect}
                            options={[
                                { value: '1', label: 'Today' },
                                { value: '2', label: 'Yesterday' },
                                { value: '3', label: 'Last week' },
                                { value: '4', label: 'Last Month' },
                                { value: '5', label: 'Project' },
                            ]}
                        />
                    </div>
                    <Column {...configColumDefect} style={{ width: '100%', height: '380px' }} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'70%'} height="190px">
                <SubHeader title="Defect Risk" size={14} color="black" />
                <div className="flex mt-6 items-center justify-center gap">
                    {defectWorkflowList.defectExceptions.map((item, index) => (
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
            <DashBroadItem width={'29%'} height="190px">
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
