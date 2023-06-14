import { Tabs } from 'antd';
import { useState } from 'react';
import { ContainerLayout } from '../../components/container/ContainerLayout';
import DashBroadBatches from '../../components/dasbroadItem/DashBroadBatches';
import DashBroadRelease from '../../components/dasbroadItem/DashBroadRelease';
import DashBroadRequiment from '../../components/dasbroadItem/DashBroadRequiment';
import DashBroadTestcase from '../../components/dasbroadItem/DashBroadTestcase';
import './DashBroadPage.scss';
import DashBroadDefect from '../../components/dasbroadItem/DashBroadDefect';
const DashBroadPage = () => {
    const [activeTab, setActiveTab] = useState('1');
    const onChange = (key: string) => {
        setActiveTab(key);
    };
    return (
        <div className="fixer-pt ml-content">
            <ContainerLayout>
                <div className="dashbroad_container">
                    <h4 className="dashbroad-title">Dashbroad</h4>

                    <div className="tab-container">
                        <Tabs activeKey={activeTab} onChange={onChange} size="large">
                            <Tabs.TabPane tab="Releases" key="1">
                                <DashBroadRelease />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Requiments" key="2">
                                <DashBroadRequiment />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Test Cases" key="3">
                                <DashBroadTestcase />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Batches" key="4">
                                <DashBroadBatches />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Defects" key="5">
                                <DashBroadDefect />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    );
};

export default DashBroadPage;
