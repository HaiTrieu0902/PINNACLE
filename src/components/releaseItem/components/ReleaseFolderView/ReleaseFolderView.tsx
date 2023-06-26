import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getReleaseFolderChart } from '../../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import SearchInput from '../../../Search/SearchInput';
import './ReleaseFolderView.scss';
import TreeFolder from './TreeFolder';
const ReleaseFolderView = () => {
    const dispatch = useAppDispatch();
    const { releasesFolderChartList } = useAppSelector((state) => state.release);
    const [searchValue, setSearchValue] = useState('');
    const [openCreateFolder, setOpenCreateFolder] = useState(false);

    const handleOnSearchFolderView = (value: string) => {
        setSearchValue(value);
    };

    // get API
    useEffect(() => {
        const releaseFolderChart = dispatch(getReleaseFolderChart(searchValue));
        return () => {
            releaseFolderChart.abort();
        };
    }, [dispatch, searchValue]);

    // handle show/hidden modal create folder
    const showModalCreateFolder = async () => {
        setOpenCreateFolder(true);
    };
    const handleCancelModalCreateFolder = () => {
        setOpenCreateFolder(false);
    };

    // handle submit create folder
    const handleSubmitCreateFolder = async (values: any) => {
        console.log('value', values);
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
                            // form={formDelete}
                            onFinish={handleSubmitCreateFolder}
                            layout="inline"
                            className="w-full"
                            id="ant-form_verify_delete"
                        >
                            <div className="w-full mt-2 release-border-footer">
                                <Form.Item
                                    name="nameFolder"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Folder name has not been entered.',
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
