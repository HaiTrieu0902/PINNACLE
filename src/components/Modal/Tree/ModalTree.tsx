import { Button, Col, Form, Input, Modal, Row } from 'antd';
import './ModalTree.scss';
import { useAppDispatch } from '../../../store';
import { useContext, useEffect } from 'react';
import { MessageContext } from '../../../App';
import { ParamReleaseFolderView } from '../../../types/release';
import { API_PATHS } from '../../../configs/api';
import { axiosData } from '../../../configs/axiosApiCusomer';
import { getReleaseFolderChart } from '../../../redux/release.slice';

interface ModalTreeProps {
    isActive?: boolean;
    title?: string;
    host?: string;
    parentFolderId?: number;
    onCancel: (value: boolean) => void;
    titleFolder?: string;
    type?: 'update' | 'create';
}

console.log('hih');
const ModalTree = ({ isActive, title, titleFolder, onCancel, host, parentFolderId, type }: ModalTreeProps) => {
    console.log('titleFolder', titleFolder);
    const dispatch = useAppDispatch();
    const [formModal] = Form.useForm();
    const messageApi: any = useContext(MessageContext);

    /* handle close modal */
    const handleCancelModal = () => {
        onCancel(false);
    };

    /* handle create folder */
    const handleSubmitCreateFolder = async (values: ParamReleaseFolderView) => {
        const param: ParamReleaseFolderView = {
            parentFolderId: Number(parentFolderId),
            folderName: values?.folderName,
            entityType: 2,
            isSubFolder: true,
        };
        const url = `${API_PATHS.API}/Common/create-folder`;
        const data = await axiosData(url, 'POST', param);
        if (data) {
            formModal.resetFields();
            onCancel(false);
            dispatch(getReleaseFolderChart({ searchString: '', isAssignToMe: true }));
            messageApi.success('Create Folder SuccessFully');
            return data;
        }
    };

    /* handle update folder */
    const handleSubmitUpdateFolder = async (values: { folderName: string }) => {
        const param = {
            folderId: parentFolderId,
            folderName: values?.folderName,
        };
        const url = `${API_PATHS.API}/Common/rename-folder`;
        const data = await axiosData(url, 'POST', param);
        if (data) {
            formModal.resetFields();
            onCancel(false);
            dispatch(getReleaseFolderChart({ searchString: '', isAssignToMe: true }));
            messageApi.success('Rename Folder SuccessFully');
            return data;
        }
    };

    useEffect(() => {
        formModal.setFieldsValue({
            folderName: titleFolder,
        });
    }, [titleFolder, formModal]);

    return (
        <Modal
            forceRender
            width={'520px'}
            open={isActive}
            onCancel={handleCancelModal}
            footer={null}
            className="release-folder-view_modal"
        >
            <div className="flex items-center flex-col">
                <h3 className="release-modal__header">{title}</h3>
                <p className="release-modal-title">{host}</p>
                <Form
                    form={formModal}
                    onFinish={type === 'create' ? handleSubmitCreateFolder : handleSubmitUpdateFolder}
                    layout="inline"
                    className="w-full"
                    id="ant-form_verify_create_folder"
                >
                    <div className="w-full mt-2 release-border-footer">
                        <Form.Item
                            name="folderName"
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
                            <Input
                                value={titleFolder ? titleFolder : ''}
                                placeholder="Please root folder"
                                className="h-10 ml-1 w-full"
                            />
                        </Form.Item>
                    </div>
                    <Row justify={'end'} className="w-full">
                        <Col>
                            <div className="flex gap-2 mt-2 mr-1 delete-footer">
                                <Button onClick={handleCancelModal} className="h-10 w-20">
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
    );
};

export default ModalTree;
