/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Dropdown, Form, Input, Modal, Row, Space, Tree } from 'antd';
import React, { useContext, useState } from 'react';
import { MessageContext } from '../../../../App';
import box from '../../../../assets/box.svg';
import folder from '../../../../assets/folder.svg';
import plant from '../../../../assets/plant.svg';
import { API_PATHS } from '../../../../configs/api';
import { axiosData } from '../../../../configs/axiosApiCusomer';
import { getReleaseFolderChart } from '../../../../redux/release.slice';
import { useAppDispatch } from '../../../../store';
import { ParamReleaseFolderView, ReleasesFolderChart, releasesFolderChartList } from '../../../../types/release';
import './ReleaseFolderView.scss';

interface TreeFolderProps {
    releasesFolderChartList: releasesFolderChartList;
}

const TreeFolder = ({ releasesFolderChartList }: TreeFolderProps) => {
    const DropdownTitle = ({ title, valueKey, children, parentId }: any) => {
        const handleChangedIcon = () => {
            if (valueKey?.substring(0, 2) === 'fd') {
                return folder;
            } else {
                if (children?.length === 0) {
                    return plant;
                } else {
                    return box;
                }
            }
        };

        const items = [
            {
                key: '1',
                label: 'Create Folder',
                className: `dropdown-title ${valueKey?.substring(0, 2) === 'fd' && 'dropdown-title_active'}`,
                disabled: valueKey?.substring(0, 2) !== 'fd',
                onClick: showModalCreateFolder,
            },
            {
                key: '2',
                label: 'Rename Folder',
                className: `dropdown-title ${valueKey?.substring(0, 2) === 'fd' && 'dropdown-title_active'}`,
                disabled: valueKey?.substring(0, 2) !== 'fd',
            },
            {
                key: '3',
                label: 'Delete Folder',
                className: `dropdown-title ${
                    valueKey?.substring(0, 2) === 'fd' && children?.length === 0 && 'dropdown-title_active'
                }`,
                disabled: children?.length > 0 || (valueKey?.substring(0, 2) !== 'fd' && true),
            },
            {
                key: '4',
                label: 'Cut',
                className: 'dropdown-title_active',
            },
            {
                key: '5',
                label: 'Paste',
                className: 'dropdown-title',
                disabled: true,
            },
            {
                key: '6',
                label: 'Detach Parent',
                className: `dropdown-title ${
                    valueKey?.substring(0, 2) !== 'fd' &&
                    children?.length === 0 &&
                    parentId &&
                    parentId?.substring(0, 2) !== 'fd' &&
                    'dropdown-title_active'
                }`,
                disabled:
                    valueKey?.substring(0, 2) === 'fd' ||
                    children?.length > 0 ||
                    parentId?.substring(0, 2) === 'fd' ||
                    !parentId,
            },
        ];

        return (
            <Dropdown menu={{ items }} trigger={['contextMenu']}>
                <Space>
                    <div className="flex items-start mt-[2px]">
                        <img className="mr-2" src={handleChangedIcon()} alt="" />
                        <p className="text-[13px] -mt-[2px]">{title}</p>
                    </div>
                </Space>
            </Dropdown>
        );
    };

    const generateTreeData = (data: ReleasesFolderChart[]): ReleasesFolderChart[] => {
        return data.map((node: any) => {
            if (node.children) {
                return {
                    ...node,
                    title: (
                        <DropdownTitle
                            node={node}
                            title={node?.title}
                            valueKey={node?.key}
                            children={node?.children}
                            parentId={node?.parentId}
                        />
                    ),
                    children: generateTreeData(node.children),
                };
            }
            return {
                ...node,
                title: (
                    <DropdownTitle
                        title={node?.title}
                        valueKey={node?.key}
                        children={node?.children}
                        parentId={node?.parentId}
                    />
                ),
            };
        });
    };

    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const [form] = Form.useForm();
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [parentFolderId, setParentFolderId] = useState<number>(0);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const [openCreateFolder, setOpenCreateFolder] = useState(false);

    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: object | any) => {
        setParentFolderId(info?.node?.id);
        console.log('onSelect', info?.node?.id);
        setSelectedKeys(selectedKeysValue);
    };

    // handle show/hidden modal create folder
    const showModalCreateFolder = async () => {
        setOpenCreateFolder(true);
    };
    const handleCancelModalCreateFolder = () => {
        setOpenCreateFolder(false);
        form.resetFields();
    };

    const treeData = generateTreeData(releasesFolderChartList?.releasesFolderChart || []);

    console.log(releasesFolderChartList?.releasesFolderChart);

    const handleSubmitCreateFolder = async (values: ParamReleaseFolderView) => {
        const param: ParamReleaseFolderView = {
            parentFolderId: parentFolderId,
            folderName: values.folderName,
            entityType: 2,
            isSubFolder: true,
        };
        const url = `${API_PATHS.API}/Common/create-folder`;
        const data = await axiosData(url, 'POST', param);
        form.resetFields();
        setOpenCreateFolder(false);
        dispatch(getReleaseFolderChart(''));
        messageApi.success('Create Folder SuccessFully');
        return data;
    };

    return (
        <div>
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={onSelect}
                treeData={treeData}
            />

            <div className="">
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
        </div>
    );
};

export default TreeFolder;
