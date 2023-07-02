import { Button, Space, Tree } from 'antd';
import React, { Key, useContext, useEffect, useState } from 'react';
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
import './ActivityCoverage.scss';
import { debounce } from 'lodash';
import ModalDefectCoverage from '../../Modal/DefectCoverage/ModalDefectCoverage';
const ActivityCoverage = () => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const { releaseDefectCoverageList } = useAppSelector((state) => state.activity);
    const { releaseId } = useAppSelector((state) => state.release);

    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedIdDelete, setSelectedIdDelete] = useState<(number | null)[]>([]);
    const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

    //Effect call API
    useEffect(() => {
        if (Number(releaseId) > 0) {
            const relaseScope = dispatch(getRelaseDefects({ id: Number(releaseId), type: 2, valueSearch: '' }));
            return () => {
                relaseScope.abort();
            };
        }
    }, [dispatch, releaseId]);

    // Effect convert key
    useEffect(() => {
        setSelectedIdDelete(
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

    /* handle search defect  */
    const handleSearchDefect = debounce((value: string) => {
        if (Number(releaseId) > 0) {
            dispatch(getRelaseDefects({ id: Number(releaseId), type: 2, valueSearch: value }));
        }
    }, 700);

    /* check Id selected tree  */
    const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
        if (Array.isArray(checked)) {
            setCheckedKeys(checked);
        } else {
            setCheckedKeys(checked.checked);
        }
    };

    /* handle active or cancel modal  */
    const onActiveModal = () => {
        setIsActiveModal(true);
    };

    const onCancelModal = (value: boolean) => {
        setIsActiveModal(value);
    };

    // handle changed Remove or Cancel buttons
    const handleRemoveOrCancelDefect = async (type: string) => {
        if (type === 'cancel') {
            setCheckedKeys([]);
        }
        if (type === 'remove') {
            const param = {
                releaseId: Number(releaseId),
                defectIds: selectedIdDelete,
            };
            const url = `${API_PATHS.API}/ReleaseDefectCoverage/delete-release-defect`;
            const data = await axiosData(url, 'POST', param);
            messageApi.success('Remove defect successfully');
            setCheckedKeys([]);
            dispatch(getRelaseDefects({ id: Number(releaseId), type: 2, valueSearch: '' }));
            dispatch(getReleaseDetail(Number(releaseId)));
            return data;
        }
    };

    // generate data tree
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

    // generate covert to tree
    const treeData = generateTreeData(releaseDefectCoverageList?.releaseDefectCoverage || []);
    return (
        <div className="release-defect">
            <div className="release-defect__header">
                <SearchInput width="80%" onSearch={handleSearchDefect} />
                <Button onClick={onActiveModal} className="button-items w-28">
                    <span className="text-sm font-medium">Add Defects</span>
                </Button>
            </div>
            <div className="release-defect__tree">
                <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData} />
                {treeData.length === 0 && (
                    <div className="flex items-center justify-center text-sm">
                        <p>There no data</p>
                    </div>
                )}
                {checkedKeys.length > 0 && (
                    <div className="release-defect__footer">
                        <Button onClick={() => handleRemoveOrCancelDefect('cancel')} className="text-xs !py-2">
                            Cancel
                        </Button>
                        <Button onClick={() => handleRemoveOrCancelDefect('remove')} className="text-xs !py-2" danger>
                            Remove
                        </Button>
                    </div>
                )}
            </div>

            <div className="modal_add_defect">
                <ModalDefectCoverage
                    isActive={isActiveModal}
                    onCancel={onCancelModal}
                    title="Add Requirements"
                    host="release"
                />
            </div>
        </div>
    );
};

export default ActivityCoverage;
