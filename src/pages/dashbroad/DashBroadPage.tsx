import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { ContainerLayout } from '../../components/Container/ContainerLayout';
import DashBroadBatches from '../../components/DasbroadItem/DashBroadBatches';
import DashBroadDefect from '../../components/DasbroadItem/DashBroadDefect';
import DashBroadRelease from '../../components/DasbroadItem/DashBroadRelease';
import DashBroadRequiment from '../../components/DasbroadItem/DashBroadRequiment';
import DashBroadTestcase from '../../components/DasbroadItem/DashBroadTestcase';
import {
    getbatchWorkflowDashboard,
    getdefectWorkflow,
    getreleaseWorkflow,
    getrequirementWorkflow,
    gettestCaseWorkflow,
} from '../../redux/dashbroad.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import './DashBroadPage.scss';

const DashBroadPage = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState('1');
    const {
        releaseWorkflow,
        requirementWorkflowList,
        testCaseWorkflowList,
        batchWorkflowDashboardList,
        defectWorkflowList,
    } = useAppSelector((state) => state.dashbroad);

    // API get getreleaseWorkflow
    useEffect(() => {
        const releaseWorkflow = dispatch(getreleaseWorkflow());
        const requirementWorkflow = dispatch(getrequirementWorkflow());
        const testCaseWorkflow = dispatch(gettestCaseWorkflow());
        const batchWorkflowDashboard = dispatch(getbatchWorkflowDashboard());
        const defectWorkflowDashboard = dispatch(getdefectWorkflow());
        return () => {
            releaseWorkflow.abort();
            requirementWorkflow.abort();
            testCaseWorkflow.abort();
            batchWorkflowDashboard.abort();
            defectWorkflowDashboard.abort();
        };
    }, [dispatch]);

    // change Tab
    const onChangeTab = (key: string) => {
        setActiveTab(key);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Releases`,
            children: <DashBroadRelease releaseWorkflow={releaseWorkflow} />,
        },
        {
            key: '2',
            label: `Requiments`,
            children: <DashBroadRequiment requirementWorkflowList={requirementWorkflowList} />,
        },
        {
            key: '3',
            label: `Test Cases`,
            children: <DashBroadTestcase testCaseWorkflowList={testCaseWorkflowList} />,
        },
        {
            key: '4',
            label: `Batches`,
            children: <DashBroadBatches batchWorkflowDashboardList={batchWorkflowDashboardList} />,
        },
        {
            key: '5',
            label: `Defects`,
            children: <DashBroadDefect defectWorkflowList={defectWorkflowList} />,
        },
    ];

    return (
        <div className="fixer-pt ml-content">
            <ContainerLayout>
                <div className="dashbroad_container">
                    <h4 className="dashbroad-title">Dashbroad</h4>

                    <div className="tab-container">
                        <Tabs
                            activeKey={activeTab}
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChangeTab}
                            size="large"
                        ></Tabs>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    );
};

export default DashBroadPage;
