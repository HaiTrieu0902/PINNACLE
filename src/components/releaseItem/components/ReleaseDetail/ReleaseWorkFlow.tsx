import { Card, Col, Divider, Popover, Row } from 'antd';
import { useState } from 'react';
import { workflowAction } from '../../../../types/release';
import { useAppSelector } from '../../../../store';

interface ReleaseWorkFlowProps {
    workflowActionList: workflowAction[];
}
const ReleaseWorkFlow = ({ workflowActionList }: ReleaseWorkFlowProps) => {
    const { releaseDetailList } = useAppSelector((state) => state.release);
    const [selectedValue, setSelectedValue] = useState<string | number>('');

    const handleSelectValue = (value: string | number) => {
        setSelectedValue(value);
    };

    console.log('đâsdsa', releaseDetailList);
    return (
        <Card
            className="sub-title-common mt-2"
            title="Workflow"
            bordered={true}
            size="small"
            extra={
                <Popover
                    placement="bottomRight"
                    title={null}
                    content={workflowActionList.map((item) => {
                        return (
                            <div
                                key={item.value}
                                onClick={() => handleSelectValue(item.value)}
                                className="workflow-popup"
                            >
                                <span>{item.text}</span>
                            </div>
                        );
                    })}
                    trigger="click"
                >
                    <img src="http://pinnacle-portal.server2div3.pgtest.co/icons/more-square.svg" alt="" />
                </Popover>
            }
            style={{ width: '100%' }}
        >
            <Row gutter={[6, 6]}>
                <Col span={10}>
                    <div className="flex flex-col">
                        <div>
                            <span className="label-common">Created :</span>
                            <div className="flex gap-2">
                                <span className="input-inline-custom">Ian Charlton</span>
                                <span className="input-inline-custom">05 Dec 2022</span>
                            </div>
                        </div>
                        <div>
                            <span className="label-common">Approved :</span>
                            <div className="flex gap-2">
                                <span className="input-inline-custom">Ian Charlton</span>
                                <span className="input-inline-custom">05 Dec 2022</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={2}>
                    <div className="h-full">
                        <Divider type="vertical" className="divider-item" />
                    </div>
                </Col>
                <Col span={10}>
                    <div className="flex flex-col">
                        <div>
                            <span className="label-common">Assigned :</span>
                            <div className="flex gap-2">
                                <span className="input-inline-custom">Ian Charlton</span>
                                <span className="input-inline-custom">05 Dec 2022</span>
                            </div>
                        </div>
                        <div>
                            <span className="label-common">Deployed :</span>
                            <div className="flex gap-2">
                                <span className="input-inline-custom">Ian Charlton</span>
                                <span className="input-inline-custom">05 Dec 2022</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={2}>
                    <div className="h-full">
                        <Divider type="vertical" className="divider-item" />
                    </div>
                </Col>
                <Col span={10}>
                    <div className="flex flex-col">
                        <div>
                            <span className="label-common">Modified :</span>
                            <div className="flex gap-2">
                                <span className="input-inline-custom">Ian Charlton</span>
                                <span className="input-inline-custom">05 Dec 2022</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default ReleaseWorkFlow;
