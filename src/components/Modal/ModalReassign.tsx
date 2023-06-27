import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';

const ModalReassign = () => {
    return (
        <div>
            <Modal
                style={{ zIndex: '9999' }}
                width={'520px'}
                // open={openReleaseRework}
                // onCancel={() => {
                //     setOpenReleaseRework(false);
                // }}
                footer={null}
                className="release-workflow_modal"
            >
                <div className="flex flex-col">
                    <h3 className="release-modal__header">PinnacleQM Test Workbench - Release Rework</h3>
                    <p className="release-modal-title">
                        Enter the Reasons for Rework the Release into the Comments and Save
                    </p>
                    <Form layout="inline" className="w-full" id="ant-form_verify_create_folder">
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
                                    <Button className="h-10 w-20">Cancel</Button>
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
        </div>
    );
};

export default ModalReassign;
