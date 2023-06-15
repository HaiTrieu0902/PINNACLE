import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useState, useEffect } from 'react';
import { ContainerLayout } from '../../components/container/ContainerLayout';
import DashBroadBatches from '../../components/dasbroadItem/DashBroadBatches';
import DashBroadDefect from '../../components/dasbroadItem/DashBroadDefect';
import DashBroadRelease from '../../components/dasbroadItem/DashBroadRelease';
import DashBroadRequiment from '../../components/dasbroadItem/DashBroadRequiment';
import DashBroadTestcase from '../../components/dasbroadItem/DashBroadTestcase';
import './DashBroadPage.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { getreleaseWorkflow, getrequirementWorkflow } from '../../redux/dashbroad.slice';

const DashBroadPage = () => {
    const dispatch = useAppDispatch();
    const { releaseWorkflow, requirementWorkflowList } = useAppSelector((state) => state.dashbroad);
    const [activeTab, setActiveTab] = useState('1');

    // API get getreleaseWorkflow
    useEffect(() => {
        const releaseWorkflow = dispatch(getreleaseWorkflow());
        const requirementWorkflow = dispatch(getrequirementWorkflow());
        return () => {
            releaseWorkflow.abort();
            requirementWorkflow.abort();
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
            children: <DashBroadTestcase />,
        },
        {
            key: '4',
            label: `Batches`,
            children: <DashBroadBatches />,
        },
        {
            key: '5',
            label: `Defects`,
            children: <DashBroadDefect />,
        },
    ];

    console.log('releaseWorkflow', releaseWorkflow);

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
