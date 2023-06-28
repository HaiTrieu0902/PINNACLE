import { Col, Divider, Progress, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import './CircleMini.scss';

interface CircleMiniProps {
    data?: any[];
}

const CircleMini = ({ data }: CircleMiniProps) => {
    const [dataItem, setDataItem] = useState<any>([]);

    useEffect(() => {
        setDataItem(data);
    }, [data]);

    return (
        <div className="mt-2">
            {dataItem.length > 0 ? (
                <Row gutter={[6, 6]} className="mini-dashboard-requirement__sub">
                    <Col span={3}>
                        <Row>
                            <Col span={24}>
                                {dataItem.length > 3 && dataItem[3]?.nameType ? (
                                    <div style={{ fontSize: '0px' }} className="mini-dashboard-requirement__sub__title">
                                        {dataItem[3].nameType}
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '0px' }} className="mini-dashboard-requirement__sub__title">
                                        Complete
                                    </div>
                                )}
                            </Col>
                            <Row className="flex">
                                <Col span={24} className="flex items-center flex-col">
                                    <span className="chart_title">
                                        {dataItem.length > 0 ? `% ${dataItem[3].nameType}` : '% Complete'}
                                    </span>
                                    {dataItem.length > 0 &&
                                        dataItem[3].miniDashboardItems.map((item: any, index: any) => {
                                            return (
                                                <Progress
                                                    key={index}
                                                    type="circle"
                                                    percent={item?.value}
                                                    format={() => `${item?.valueString}`}
                                                    className="chart__circle"
                                                    strokeColor={{
                                                        '100%': `${item?.backColor}`,
                                                    }}
                                                />
                                            );
                                        })}
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" className="releaseId-item" />
                    </Col>
                    <Col span={10}>
                        <Row className="w-full">
                            <Col span={24}>
                                <div className="mini-dashboard-requirement__sub__title">
                                    {dataItem.length > 0 ? `% ${dataItem[2].nameType}` : '% Test Execution'}
                                </div>
                            </Col>
                            <Row className="flex flex-wrap items-center w-full" gutter={[6, 6]}>
                                {dataItem.length > 0 &&
                                    [...dataItem[2].miniDashboardItems].reverse().map((item: any, index: any) => {
                                        return (
                                            <Col key={index} span={8} className="flex items-center flex-col">
                                                <span className="chart_title">{item?.name}</span>
                                                <Progress
                                                    type="circle"
                                                    percent={item?.value}
                                                    format={() => `${item?.valueString}`}
                                                    className="chart__circle"
                                                    strokeColor={{
                                                        '100%': `${item?.backColor}`,
                                                    }}
                                                />
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row className="relative">
                            <div className="absolute -left-2">
                                <Divider type="vertical" className="releaseId-item" />
                            </div>

                            <Col span={24}>
                                <div style={{ fontSize: '0px' }} className="mini-dashboard-requirement__sub__title">
                                    {dataItem.length > 0 ? `% ${dataItem[1].nameType}` : '% Execution'}
                                </div>
                            </Col>
                            <Row className="flex">
                                <Col span={24} className="flex items-center flex-col">
                                    <span className="chart_title">
                                        {dataItem.length > 0 ? `${dataItem[0].nameType}` : 'Open Defects'}
                                    </span>
                                    {dataItem.length > 0 &&
                                        dataItem[0].miniDashboardItems.map((item: any, index: any) => {
                                            return (
                                                <Progress
                                                    key={index}
                                                    type="circle"
                                                    percent={100}
                                                    format={() => `${item?.valueString}`}
                                                    className="chart__circle"
                                                    strokeColor={{
                                                        '100%': `${item?.backColor}`,
                                                    }}
                                                />
                                            );
                                        })}
                                </Col>
                            </Row>

                            <div className="absolute right-1">
                                <Divider type="vertical" className="releaseId-item" />
                            </div>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row className="flex">
                            <Col span={24}>
                                <div className="mini-dashboard-requirement__sub__title ">
                                    {dataItem.length > 0 ? `${dataItem[1].nameType}` : 'Days Remaining in Release'}
                                </div>
                            </Col>
                            <Row className="flex flex-wrap items-center justify-around">
                                {dataItem.length > 0 &&
                                    [...dataItem[1].miniDashboardItems].reverse().map((item: any, index: any) => {
                                        return (
                                            <Col key={index} span={12} className="flex items-center flex-col">
                                                <span className="chart_title text-center chart_title__munder">
                                                    {item?.name}
                                                </span>
                                                <Progress
                                                    type="circle"
                                                    percent={100}
                                                    format={() => `${item?.valueString}`}
                                                    className="chart__circle"
                                                    strokeColor={{
                                                        '100%': `${item?.backColor}`,
                                                    }}
                                                />
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </Row>
                    </Col>
                </Row>
            ) : (
                <div className="flex items-center justify-center">
                    <Spin style={{ color: 'red' }} />
                </div>
            )}
        </div>
    );
};

export default CircleMini;
