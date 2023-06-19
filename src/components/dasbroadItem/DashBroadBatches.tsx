import { Column, Pie } from '@ant-design/plots';
import { deepMix } from '@antv/util';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getBatchDailyWorkflow } from '../../redux/dashbroad.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { batchWorkflowDashboardList } from '../../types/dashbroad';
import { generatePieChartConfig } from '../../utils/dashbroadColor';
import SubHeader from '../Header/SubHeader';
import DashBroadCustom from './branching/DashBroadCustom';
import DashBroadItem from './branching/DashBroadItem';

interface DashBroadBatchesProps {
    batchWorkflowDashboardList: batchWorkflowDashboardList;
}

const DashBroadBatches = ({ batchWorkflowDashboardList }: DashBroadBatchesProps) => {
    const dispatch = useAppDispatch();
    const { batchDaisyList } = useAppSelector((state) => state.dashbroad);
    const [formItem, setFormItem] = useState('1');
    const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(dayjs('2022-05-13', 'YYYY-MM-DD'));
    const [toDate, setToDate] = useState<dayjs.Dayjs | null>(dayjs(new Date().toISOString(), 'YYYY-MM-DD'));

    // get API
    useEffect(() => {
        const batchDailyWorkflow = dispatch(
            getBatchDailyWorkflow({
                fromDate: String(fromDate?.toISOString()),
                toDate: String(toDate?.toISOString()),
                Type: formItem,
            }),
        );
        return () => {
            batchDailyWorkflow.abort();
        };
    }, [dispatch, formItem, fromDate, toDate]);

    const configColumBatches = {
        appendPadding: 5,
        autoFit: true,
        data: batchDaisyList,
        xField: 'dateStartedString',
        yField: 'totalRuns',
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
    };

    const handleChangeSelect = (value: string) => {
        setFormItem(value);
    };

    return (
        <div className="flex w-full gap-2 flex-wrap">
            <DashBroadItem width={'54%'} height="480px">
                <SubHeader title="Batch Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...generatePieChartConfig(batchWorkflowDashboardList.batchWorkflowDashboard?.workflowItem)} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'} height="480px">
                <SubHeader title="Test Daily Frequency" size={14} color="black" />
                <div>
                    <div className="dashbroad-datepicker flex justify-between mb-10 mt-3">
                        <div className="flex gap-4 items-center">
                            <span>Form: </span>
                            <DatePicker value={fromDate} onChange={(date) => setFromDate(date)} format={'YYYY-MM-DD'} />
                        </div>
                        <div className="flex gap-4 items-center">
                            <span>To: </span>
                            <DatePicker value={toDate} onChange={(date) => setToDate(date)} format={'YYYY-MM-DD'} />
                        </div>
                    </div>
                    <div className="-mt-6 mb-2">
                        <Select
                            defaultValue="Test Cases"
                            style={{ width: 140 }}
                            onChange={handleChangeSelect}
                            options={[
                                { value: 'Test Cases', label: 'Test Cases' },
                                { value: 'Components', label: 'Components' },
                                { value: 'Test Steps', label: 'Test Steps' },
                            ]}
                        />
                    </div>

                    <Column {...configColumBatches} style={{ width: '100%', height: '340px' }} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'54%'} height="190px">
                <SubHeader title="Exception Dashboard" size={14} color="black" />
                <div className="flex mt-6 items-center justify-center gap-11">
                    {batchWorkflowDashboardList.batchExceptionDashboard.map((item, index) => (
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

export default DashBroadBatches;
