/* eslint-disable no-extra-boolean-cast */
import { CaretRightOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import type { CollapseProps } from 'antd';
import { Card, Col, Collapse, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import noData from '../../../../../assets/noData.svg';
import {
    getRelaseExcution,
    getRelaseIssueStatus,
    getRelaseMiniDashbroad,
    resetValueMiniDashbroad,
    resetValueMiniExcute,
    resetValueMiniIssueStatus,
} from '../../../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { releaseIssueStatuss } from '../../../../../types/release';
import { generatePieChartConfigRelease } from '../../../../../utils/dashbroadColor';
import CircleMini from '../../../../Circle/CircleMini';
import './ReleaseDashbroad.scss';
const ReleaseDashbroad = () => {
    const dispatch = useAppDispatch();
    const { releaseId, miniDashboardItemList, releaseExcutionStatus, releaseIssueStatusList } = useAppSelector(
        (state) => state.release,
    );
    const [issueStatusList, SetIssueStatusList] = useState<releaseIssueStatuss[]>([]);

    const [isCollapseVisible, setIsCollapseVisible] = useState(false);
    const [isCollapseVisibleExcute, setIsCollapseVisibleExcute] = useState(false);
    const [isCollapseVisibleIssue, setIsCollapseVisibleIssue] = useState(false);
    const [prevReleaseId, setPrevReleaseId] = useState<number | null>(0);

    // get data releaseIssueStatuss if value issueStatusValue > 0
    useEffect(() => {
        if (releaseIssueStatusList?.releaseIssueStatuss) {
            const filteredStatusList = releaseIssueStatusList?.releaseIssueStatuss.filter(
                (status) => status.issueStatusValue > 0,
            );
            SetIssueStatusList(filteredStatusList);
        }
    }, [releaseIssueStatusList?.releaseIssueStatuss]);

    // effect call API
    useEffect(() => {
        if (Number(releaseId) > 0 && isCollapseVisible && miniDashboardItemList.length === 0) {
            const relaseMiniDashbroad = dispatch(getRelaseMiniDashbroad(Number(releaseId)));
            return () => {
                relaseMiniDashbroad.abort();
            };
        }
    }, [dispatch, releaseId, isCollapseVisible, miniDashboardItemList]);

    useEffect(() => {
        if (Number(releaseId) > 0 && isCollapseVisibleExcute && Object.keys(releaseExcutionStatus).length === 0) {
            const relaseExcution = dispatch(getRelaseExcution(Number(releaseId)));
            return () => {
                relaseExcution.abort();
            };
        }
    }, [dispatch, releaseId, isCollapseVisibleExcute, releaseExcutionStatus]);

    useEffect(() => {
        if (Number(releaseId) > 0 && isCollapseVisibleIssue && Object.keys(releaseIssueStatusList).length === 0) {
            const relaseIssueStatus = dispatch(getRelaseIssueStatus(Number(releaseId)));
            return () => {
                relaseIssueStatus.abort();
            };
        }
    }, [dispatch, releaseId, isCollapseVisibleIssue, releaseIssueStatusList]);

    // effect changed value releaseID
    useEffect(() => {
        setPrevReleaseId(releaseId);
    }, [releaseId]);

    useEffect(() => {
        if (Number(releaseId) !== Number(prevReleaseId)) {
            setIsCollapseVisible(false);
            dispatch(resetValueMiniDashbroad());
        }
        if (Number(releaseId) !== Number(prevReleaseId)) {
            setIsCollapseVisibleExcute(false);
            dispatch(resetValueMiniExcute());
        }
        if (Number(releaseId) !== Number(prevReleaseId)) {
            setIsCollapseVisibleIssue(false);
            dispatch(resetValueMiniIssueStatus());
        }
    }, [releaseId, prevReleaseId, isCollapseVisible, isCollapseVisibleExcute, isCollapseVisibleIssue, dispatch]);

    const itemsMiDashbroad: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Mini-Dashboard',
            children: (
                <div>
                    <CircleMini data={miniDashboardItemList} />
                </div>
            ),
        },
    ];

    const itemsExcution: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Release Execution Status',
            children: (
                <>
                    {Object.keys(releaseExcutionStatus).length > 0 ? (
                        <div style={{ minHeight: '250px' }}>
                            <table className="release-execution-status__table">
                                <thead>
                                    <tr className="release-execution-status__title label-common">
                                        <th></th>
                                        <th className="label-common">Test Cases</th>
                                        <th className="label-common">Tests</th>
                                        <th className="label-common">Conditions</th>
                                        <th className="label-common">Test Steps</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="label-common">Not Run :</td>
                                        <td className="label-common-sub">
                                            {releaseExcutionStatus?.testCasesToExecute}
                                        </td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testsToExecute}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.conditionsNotRun}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testStepsNotRun}</td>
                                    </tr>
                                    <tr>
                                        <td className="label-common">In Progress :</td>
                                        <td className="label-common-sub">
                                            {releaseExcutionStatus?.testCasesInProgress}
                                        </td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testsInProgress}</td>
                                        <td className="label-common-sub">
                                            {releaseExcutionStatus?.conditionsInProgress}
                                        </td>
                                        <td className="label-common-sub">
                                            {releaseExcutionStatus?.testStepsInProgress}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="label-common">Failed :</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testCasesFailed}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testsFailed}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.conditionsFailed}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testStepsFailed}</td>
                                    </tr>
                                    <tr>
                                        <td className="label-common">Blocked :</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testCasesBlocked}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testsBlocked}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.conditionsBlocked}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testStepsBlocked}</td>
                                    </tr>
                                    <tr>
                                        <td className="label-common">Passed :</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testCasesPassed}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testsPassed}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.conditionsPassed}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testStepsPassed}</td>
                                    </tr>
                                    <tr>
                                        <td className="label-common">Total :</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testCasesTotal}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testsTotal}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.conditionsTotal}</td>
                                        <td className="label-common-sub">{releaseExcutionStatus?.testStepsTotal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Spin style={{ color: 'red' }} />
                        </div>
                    )}
                </>
            ),
        },
    ];

    const itemsIssueStatus: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Release Issue Status',
            children: (
                <>
                    <div style={{ minHeight: '250px' }}>
                        {issueStatusList.length > 0 ? (
                            <Pie style={{ height: '250px' }} {...generatePieChartConfigRelease(issueStatusList)} />
                        ) : (
                            <div className="flex items-center justify-center pt-10">
                                <img src={noData} alt="" />
                            </div>
                        )}
                    </div>
                </>
            ),
        },
    ];

    return (
        <div>
            <Card className="sub-title-common mt-2" bordered={true} size="small" style={{ width: '100%' }}>
                <Collapse
                    className="release-mini-dashboard"
                    bordered={false}
                    // defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    items={itemsMiDashbroad}
                    activeKey={isCollapseVisible ? ['1'] : undefined}
                    onChange={(activeKeys) => setIsCollapseVisible(activeKeys.includes('1'))}
                />
            </Card>

            <Row gutter={[6, 6]}>
                <Col span={12}>
                    <Card className="sub-title-common mt-2" bordered={true} size="small" style={{ width: '100%' }}>
                        <Collapse
                            className="release-mini-dashboard"
                            bordered={false}
                            // defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            items={itemsExcution}
                            activeKey={isCollapseVisibleExcute ? ['1'] : undefined}
                            onChange={(activeKeys) => setIsCollapseVisibleExcute(activeKeys.includes('1'))}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="sub-title-common mt-2" bordered={true} size="small" style={{ width: '100%' }}>
                        <Collapse
                            className="release-mini-dashboard"
                            bordered={false}
                            // defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            items={itemsIssueStatus}
                            activeKey={isCollapseVisibleIssue ? ['1'] : undefined}
                            onChange={(activeKeys) => setIsCollapseVisibleIssue(activeKeys.includes('1'))}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ReleaseDashbroad;
