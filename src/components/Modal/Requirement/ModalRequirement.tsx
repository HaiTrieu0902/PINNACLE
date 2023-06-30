/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Modal, Row, Space, Tree } from 'antd';
import { Key, useContext, useEffect, useState } from 'react';
import IconFile from '../../../assets/file.svg';
import IconOpen from '../../../assets/fileOpen.svg';
import IconFolder from '../../../assets/folder.svg';
import { getRelaseScope } from '../../../redux/activity.slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import SearchInput from '../../Search/SearchInput';
import './ModalRequirement.scss';
import { debounce } from 'lodash';
import { MessageContext } from '../../../App';
import { API_PATHS } from '../../../configs/api';
import { axiosData } from '../../../configs/axiosApiCusomer';
import { getReleaseDetail } from '../../../redux/release.slice';

interface ModalRequirementProps {
    isActive?: boolean;
    title?: string;
    host?: string;
    onCancel: (value: boolean) => void;
}

const ModalRequirement = ({ isActive, title, onCancel }: ModalRequirementProps) => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const { releaseScopeListAdd } = useAppSelector((state) => state.activity);
    const { releaseId } = useAppSelector((state) => state.release);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedIdAdd, setSelectedIdAdd] = useState<(number | null)[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    /*Effect call API */
    useEffect(() => {
        if (Number(releaseId) > 0 && openModal) {
            const relaseScope = dispatch(getRelaseScope({ id: Number(releaseId), type: 3, valueSearch: '' }));
            return () => {
                relaseScope.abort();
            };
        }
    }, [dispatch, releaseId, openModal]);

    /* Set state to open modal */
    useEffect(() => {
        if (isActive !== undefined) {
            setOpenModal(isActive);
        }
    }, [isActive]);

    /* Effect filter selectedIdAdd */
    useEffect(() => {
        setSelectedIdAdd(
            checkedKeys
                .map((key: any) => {
                    if (key.includes('fd_')) {
                        return null;
                    }
                    const parts = key.split('-');
                    return parseInt(parts[parts.length - 1]);
                })
                .filter((value) => value !== null),
        );
    }, [checkedKeys]);

    /* handle close modal */
    const handleCancelModal = () => {
        setOpenModal(false);
        setCheckedKeys([]);
        onCancel(false);
    };

    /* handle search value tree */
    const handleSearchRequirement = debounce((value: string) => {
        if (Number(releaseId) > 0) {
            dispatch(getRelaseScope({ id: Number(releaseId), type: 3, valueSearch: value }));
        }
    }, 700);
    /* onCheck value tree */
    const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
        if (Array.isArray(checked)) {
            setCheckedKeys(checked);
        } else {
            setCheckedKeys(checked.checked);
        }
    };

    /* generate config title for tree data */
    const generateTreeData = (data: any[]): any[] => {
        return data.map((node: any) => {
            if (node.children) {
                return {
                    ...node,
                    title: (
                        <Space>
                            <div className="flex items-start mt-[2px]">
                                {node?.key.substring(0, 2) === 'fd' ? (
                                    <img className="mr-2" src={IconFolder} alt="" />
                                ) : node?.children.length > 0 ? (
                                    <img className="mr-2" src={IconOpen} alt="" />
                                ) : (
                                    <img className="mr-2" src={IconFile} alt="" />
                                )}

                                <p className="text-[13px] -mt-[2px]">{node?.title}</p>
                            </div>
                        </Space>
                    ),
                    children: generateTreeData(node.children),
                };
            }
            return {
                ...node,
                title: (
                    <Space>
                        <div className="flex items-start mt-[2px]">
                            {node?.key.substring(0, 2) === 'fd' ? (
                                <img className="mr-2" src={IconFolder} alt="" />
                            ) : node?.children.length > 0 ? (
                                <img className="mr-2" src={IconOpen} alt="" />
                            ) : (
                                <img className="mr-2" src={IconFile} alt="" />
                            )}

                            <p className="text-[13px] -mt-[2px]">{node?.title}</p>
                        </div>
                    </Space>
                ),
            };
        });
    };

    /* handle Add or Cancel Add Requirements */
    const handleAddRequirements = async () => {
        if (selectedIdAdd.length > 0) {
            const param = {
                releaseId: Number(releaseId),
                requiredmentIds: selectedIdAdd,
            };
            const url = `${API_PATHS.API}/ReleaseRequiredmentScope/assign-release-requirement`;
            messageApi.success('Add requirement successfully');
            const data = await axiosData(url, 'POST', param);
            setCheckedKeys([]);
            setOpenModal(false);
            dispatch(getRelaseScope({ id: Number(releaseId), type: 2, valueSearch: '' }));
            dispatch(getReleaseDetail(Number(releaseId)));
            return data;
        }
    };

    const treeData = generateTreeData(releaseScopeListAdd?.releaseScope || []);

    return (
        <Modal width={'1000px'} open={openModal} onCancel={handleCancelModal} footer={null}>
            <div className="flex flex-col">
                <div className="">
                    <h3 className="release-modal__header mb-4 capitalize">{title}</h3>
                    <Divider type="horizontal" className="-mt-2" />
                    <SearchInput width="100%" onSearch={handleSearchRequirement} />
                </div>

                <Row className="modal-requirement_content">
                    <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData} />
                </Row>

                <Row justify={'end'} className="w-full -mt-4">
                    <Divider type="horizontal" className="" />
                    <Button onClick={handleCancelModal} className="h-10 w-20 mr-3">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddRequirements}
                        disabled={checkedKeys.length === 0 ? true : false}
                        className={`button-items ${checkedKeys.length === 0 && 'button-prevent'} h-10 w-16`}
                    >
                        <span className="text-sm font-medium">Add</span>
                    </Button>
                </Row>
            </div>
        </Modal>
    );
};

export default ModalRequirement;
