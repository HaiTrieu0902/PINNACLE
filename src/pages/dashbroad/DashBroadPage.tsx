import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useState } from 'react';
import { ContainerLayout } from '../../components/container/ContainerLayout';
import DashBroadBatches from '../../components/dasbroadItem/DashBroadBatches';
import DashBroadDefect from '../../components/dasbroadItem/DashBroadDefect';
import DashBroadRelease from '../../components/dasbroadItem/DashBroadRelease';
import DashBroadRequiment from '../../components/dasbroadItem/DashBroadRequiment';
import DashBroadTestcase from '../../components/dasbroadItem/DashBroadTestcase';
import './DashBroadPage.scss';

const DashBroadPage = () => {
    const [activeTab, setActiveTab] = useState('1');
    const onChange = (key: string) => {
        setActiveTab(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Releases`,
            children: <DashBroadRelease />,
        },
        {
            key: '2',
            label: `Requiments`,
            children: <DashBroadRequiment />,
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
                            onChange={onChange}
                            size="large"
                        ></Tabs>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    );
};

export default DashBroadPage;
