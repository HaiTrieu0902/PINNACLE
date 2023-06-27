import { Button, Card, Col, Divider, Form, Input, Modal, Popover, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../../App';
import { API_PATHS } from '../../../../configs/api';
import { axiosData } from '../../../../configs/axiosApiCusomer';
import { getReleaseDetail } from '../../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { workflowAction } from '../../../../types/release';
import './ReleaseDetail.scss';
import ModalItem from '../../../Modal/ModalItem';
import { getUserSelects } from '../../../../redux/authToken';
interface ReleaseWorkFlowProps {
    workflowActionList: workflowAction[];
    releaseId: number | null;
}
const ReleaseWorkFlow = ({ workflowActionList, releaseId }: ReleaseWorkFlowProps) => {
    const messageApi: any = useContext(MessageContext);
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const { user, userSelectList } = useAppSelector((state) => state.auth);
    const { releaseDetailList } = useAppSelector((state) => state.release);
    const [selectedValue, setSelectedValue] = useState<string | number>('');
    const [openReleaseRework, setOpenReleaseRework] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleSelectValue = (value: string | number) => {
        setSelectedValue(value);

        if (value === 3) {
            setOpenReleaseRework(true);
        }
        if (value === 5 || value === 6) {
            setIsActive(true);
        }
    };
    const onCancel = (value: boolean) => {
        setIsActive(value);
    };

    // Update WorkFlow
    useEffect(() => {
        const fetchData = async () => {
            let url = '';
            let requestData = {};
            if (selectedValue === 1) {
                url = `${API_PATHS.API}/Releases/release-workflow-draft?releaseId=${releaseId}`;
                requestData = { releaseId };
            } else if (selectedValue === 2) {
                url = `${API_PATHS.API}/Releases/release-workflow-readyforreview?releaseId=${releaseId}`;
                requestData = { releaseId };
            } else if (selectedValue === 4) {
                url = `${API_PATHS.API}/Releases/release-workflow-approved`;
                requestData = {
                    entityId: releaseId,
                    userId: user.userId,
                };
            } else if (selectedValue === 7) {
                url = `${API_PATHS.API}/Releases/release-workflow-deploy?releaseId=${releaseId}`;
                requestData = { releaseId };
            } else {
                return;
            }

            const data = await axiosData(url, 'POST', requestData);
            dispatch(getReleaseDetail(Number(releaseId)));
            messageApi.success(`Workflow ${releaseId} was updated successfully`);
            return data;
        };

        fetchData();
    }, [selectedValue, releaseId, messageApi, user.userId, dispatch]);

    const handleSubmitUpdateRework = async (values: { reworkReason: string }) => {
        const param = {
            releaseId: releaseId,
            reworkReason: values.reworkReason,
        };
        const url = `${API_PATHS.API}/Releases/release-workflow-rework`;
        const data = await axiosData(url, 'POST', param);
        dispatch(getReleaseDetail(Number(releaseId)));
        form.resetFields();
        setOpenReleaseRework(false);
        messageApi.success(`Workflow ${releaseId} was updated successfully`);
        return data;
    };

    // call aPI userSelects
    useEffect(() => {
        const userSelects = dispatch(getUserSelects());
        return () => {
            userSelects.abort();
        };
    }, [dispatch]);
    return (
        <React.Fragment>
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
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.createdByName}
                                    </span>
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.releaseCreatedOn &&
                                            moment(releaseDetailList?.releaseDetail?.releaseCreatedOn).format(
                                                'DD MMM YYYY',
                                            )}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="label-common">Approved :</span>
                                <div className="flex gap-2">
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.releaseApprovedBy}
                                    </span>
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.releaseApprovedOn &&
                                            moment(releaseDetailList?.releaseDetail?.releaseApprovedOn).format(
                                                'DD MMM YYYY',
                                            )}
                                    </span>
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
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.assignedToName}
                                    </span>
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.releaseAssignedOn &&
                                            moment(releaseDetailList?.releaseDetail?.releaseAssignedOn).format(
                                                'DD MMM YYYY',
                                            )}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="label-common">Deployed :</span>
                                <div className="flex gap-2">
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.releaseDeployedBy}
                                    </span>
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.releaseDeployedOn &&
                                            moment(releaseDetailList?.releaseDetail?.releaseDeployedOn).format(
                                                'DD MMM YYYY',
                                            )}
                                    </span>
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
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.modifiedByName}
                                    </span>
                                    <span className="input-inline-custom">
                                        {releaseDetailList?.releaseDetail?.modifiedOn &&
                                            moment(releaseDetailList?.releaseDetail?.modifiedOn).format('DD MMM YYYY')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            <div>
                {/* Modal RelaseWork */}
                <Modal
                    style={{ zIndex: '9999' }}
                    width={'520px'}
                    open={openReleaseRework}
                    onCancel={() => {
                        setOpenReleaseRework(false);
                    }}
                    footer={null}
                    className="release-workflow_modal"
                >
                    <div className="flex flex-col">
                        <h3 className="release-modal__header">PinnacleQM Test Workbench - Release Rework</h3>
                        <p className="release-modal-title">
                            Enter the Reasons for Rework the Release into the Comments and Save
                        </p>
                        <Form
                            form={form}
                            onFinish={handleSubmitUpdateRework}
                            layout="inline"
                            className="w-full"
                            id="ant-form_verify_create_folder"
                        >
                            <div className="w-full mt-2 release-border-footer">
                                <Form.Item
                                    name="reworkReason"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Folder name has not been entered.',
                                        },
                                        {
                                            max: 300,
                                            message: 'Folder name cannot be longer than 300 characters',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please Enter the Reasons" className="h-10 ml-1 w-full" />
                                </Form.Item>
                            </div>
                            <Row justify={'end'} className="w-full">
                                <Col>
                                    <div className="flex gap-2 mt-2 mr-1 delete-footer">
                                        <Button
                                            onClick={() => {
                                                setOpenReleaseRework(false);
                                            }}
                                            className="h-10 w-20"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            htmlType="submit"
                                            className="button-items h-10 w-20 items-center justify-center"
                                        >
                                            <span>OK</span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>

                {/* Modal Reassign */}

                {selectedValue === 5 && (
                    <ModalItem
                        isActive={isActive}
                        onCancel={onCancel}
                        title="Reassign"
                        subTitle="Please select a User to Reassign the Release to"
                        data={userSelectList.userSelects}
                    />
                )}

                {/* Modal Escalate */}
                {selectedValue === 6 && (
                    <ModalItem
                        isActive={isActive}
                        onCancel={onCancel}
                        title="Escalate"
                        subTitle="Please identify and select the individual to Escalate this Release to"
                        data={userSelectList.userSelects}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default ReleaseWorkFlow;
