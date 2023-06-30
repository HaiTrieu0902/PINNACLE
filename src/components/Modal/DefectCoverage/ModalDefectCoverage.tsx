import { Button, Divider, Modal, Row, Space, Tree } from 'antd';
import { Key } from 'antd/es/table/interface';
import { debounce } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../App';
import IconCritial from '../../../assets/defect/critial.svg';
import IconHight from '../../../assets/defect/hight.svg';
import IconLow from '../../../assets/defect/low.svg';
import IconMedium from '../../../assets/defect/medium.svg';
import IconOther from '../../../assets/defect/other.svg';
import IconVirus from '../../../assets/defect/virus.svg';
import { API_PATHS } from '../../../configs/api';
import { axiosData } from '../../../configs/axiosApiCusomer';
import { getRelaseDefects } from '../../../redux/activity.slice';
import { getReleaseDetail } from '../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import SearchInput from '../../Search/SearchInput';
import './ModalDefectCoverage.scss';
interface ModalDefectCoverageProps {
    isActive?: boolean;
    title?: string;
    host?: string;
    onCancel: (value: boolean) => void;
}

const ModalDefectCoverage = ({ isActive, title, onCancel }: ModalDefectCoverageProps) => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const { releaseDefectCoverageListAdd } = useAppSelector((state) => state.activity);
    const { releaseId } = useAppSelector((state) => state.release);

    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedIdAdd, setSelectedIdAdd] = useState<(number | null)[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    /*Effect call API */
    useEffect(() => {
        if (Number(releaseId) > 0 && openModal) {
            const relaseScope = dispatch(getRelaseDefects({ id: Number(releaseId), type: 3, valueSearch: '' }));
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

    const handleSearchDefect = debounce((value: string) => {
        if (Number(releaseId) > 0) {
            dispatch(getRelaseDefects({ id: Number(releaseId), type: 3, valueSearch: value }));
        }
    }, 700);

    /* handle close modal */
    const handleCancelModal = () => {
        setOpenModal(false);
        setCheckedKeys([]);
        onCancel(false);
    };

    /* onCheck value tree */
    const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
        if (Array.isArray(checked)) {
            setCheckedKeys(checked);
        } else {
            setCheckedKeys(checked.checked);
        }
    };

    /* handle Add or Cancel Add Requirements */
    const handleAddDefect = async () => {
        if (selectedIdAdd.length > 0) {
            const param = {
                releaseId: Number(releaseId),
                defectIds: selectedIdAdd,
            };
            const url = `${API_PATHS.API}/ReleaseDefectCoverage/assign-release-defect`;
            const data = await axiosData(url, 'POST', param);
            messageApi.success('Add Defect successfully');
            setCheckedKeys([]);
            setOpenModal(false);
            dispatch(getRelaseDefects({ id: Number(releaseId), type: 2, valueSearch: '' }));
            dispatch(getReleaseDetail(Number(releaseId)));
            return data;
        }
    };

    /* generate config title for tree data */
    const generateTreeData = (data: any[]): any[] => {
        return data.map((node: any) => {
            const handleChangeIcon = () => {
                if (node?.key.substring(0, 2) === 'fd') {
                    if (node?.title?.substring(2).toLowerCase() === 'critial') {
                        return IconCritial;
                    } else if (node?.title?.substring(2).toLowerCase() === 'high') {
                        return IconHight;
                    } else if (node?.title?.substring(2).toLowerCase() === 'low') {
                        return IconLow;
                    } else if (node?.title?.substring(2).toLowerCase() === 'medium') {
                        return IconMedium;
                    } else if (node?.title?.substring(2).toLowerCase() === 'other') {
                        return IconOther;
                    }
                } else {
                    return IconVirus;
                }
                return IconCritial;
            };

            if (node.children) {
                return {
                    ...node,
                    title: (
                        <Space>
                            <div className="flex items-start mt-[2px]">
                                <img
                                    className="mr-2"
                                    src={handleChangeIcon()}
                                    alt={node?.title?.substring(2).toLowerCase()}
                                />
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
                                <img className="mr-2" src={IconCritial} alt="" />
                            ) : node?.children.length > 0 ? (
                                <img className="mr-2" src={IconVirus} alt="" />
                            ) : (
                                <img className="mr-2" src={IconVirus} alt="" />
                            )}

                            <p className="text-[13px] -mt-[2px]">{node?.title}</p>
                        </div>
                    </Space>
                ),
            };
        });
    };

    const treeData = generateTreeData(releaseDefectCoverageListAdd?.releaseDefectCoverage || []);

    return (
        <Modal width={'1000px'} open={openModal} onCancel={handleCancelModal} footer={null}>
            <div className="flex flex-col">
                <div className="">
                    <h3 className="release-modal__header mb-4 capitalize">{title}</h3>
                    <Divider type="horizontal" className="-mt-2" />
                    <SearchInput width="100%" onSearch={handleSearchDefect} />
                </div>

                <Row className="modal-defects_content">
                    <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData} />
                </Row>

                <Row justify={'end'} className="w-full -mt-4">
                    <Divider type="horizontal" className="" />
                    <Button onClick={handleCancelModal} className="h-10 w-20 mr-3">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddDefect}
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

export default ModalDefectCoverage;
