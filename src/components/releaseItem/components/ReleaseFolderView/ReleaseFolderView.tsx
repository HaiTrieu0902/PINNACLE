import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../../App';
import { API_PATHS } from '../../../../configs/api';
import { axiosData } from '../../../../configs/axiosApiCusomer';
import { getReleaseFolderChart } from '../../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { ParamReleaseFolderView } from '../../../../types/release';
import SearchInput from '../../../Search/SearchInput';
import './ReleaseFolderView.scss';
import TreeFolder from './TreeFolder';
const ReleaseFolderView = () => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const [form] = Form.useForm();
    const { releasesFolderChartList } = useAppSelector((state) => state.release);
    const [searchValue, setSearchValue] = useState('');
    const [openCreateFolder, setOpenCreateFolder] = useState(false);

    /* handle search folder view*/
    const handleOnSearchFolderView = (value: string) => {
        setSearchValue(value);
    };

    /* Effect call api Folder Chart*/
    useEffect(() => {
        const releaseFolderChart = dispatch(getReleaseFolderChart({ searchString: searchValue, isAssignToMe: true }));
        return () => {
            releaseFolderChart.abort();
        };
    }, [dispatch, searchValue]);

    /* handle show/hidden modal create folder*/
    const showModalCreateFolder = async () => {
        setOpenCreateFolder(true);
    };
    const handleCancelModalCreateFolder = () => {
        setOpenCreateFolder(false);
    };

    /* handle submit create folder */
    const handleSubmitCreateFolder = async (values: ParamReleaseFolderView) => {
        const param: ParamReleaseFolderView = {
            parentFolderId: 0,
            folderName: values.folderName,
            entityType: 2,
            isSubFolder: false,
        };
        const url = `${API_PATHS.API}/Common/create-folder`;
        const data = await axiosData(url, 'POST', param);
        form.resetFields();
        setOpenCreateFolder(false);
        dispatch(getReleaseFolderChart({ searchString: '', isAssignToMe: true }));
        messageApi.success('Create Folder SuccessFully');
        return data;
    };

    return (
        <div className="release-card-body">
            <div className="release-folder-view">
                <div className="release-folder-view__header">
                    <SearchInput width="100%" onSearch={handleOnSearchFolderView} />
                    <Button onClick={showModalCreateFolder} className="button-folder-view">
                        Create Root Folder
                    </Button>
                </div>
                <div className="release-folder-view__tree-content">
                    <TreeFolder releasesFolderChartList={releasesFolderChartList} />
                </div>
            </div>
            <div className="release-folder_modal_container">
                <Modal
                    width={'520px'}
                    open={openCreateFolder}
                    onCancel={handleCancelModalCreateFolder}
                    footer={null}
                    className="release-folder-view_modal"
                >
                    <div className="flex items-center flex-col">
                        <h3 className="release-modal__header">New Release Folder</h3>
                        <p className="release-modal-title">Please Enter the name of the new folder</p>
                        <Form
                            form={form}
                            onFinish={handleSubmitCreateFolder}
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
                                    <Input placeholder="Please root folder" className="h-10 ml-1 w-full" />
                                </Form.Item>
                            </div>
                            <Row justify={'end'} className="w-full">
                                <Col>
                                    <div className="flex gap-2 mt-2 mr-1 delete-footer">
                                        <Button onClick={handleCancelModalCreateFolder} className="h-10 w-20">
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
            </div>
        </div>
    );
};

export default ReleaseFolderView;
