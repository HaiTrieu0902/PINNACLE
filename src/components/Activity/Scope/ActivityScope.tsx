/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space } from 'antd';
import Tree from 'antd/es/tree';
import { debounce } from 'lodash';
import { Key } from 'rc-tree/lib/interface';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../App';
import IconFile from '../../../assets/file.svg';
import IconOpen from '../../../assets/fileOpen.svg';
import IconFolder from '../../../assets/folder.svg';
import { API_PATHS } from '../../../configs/api';
import { axiosData } from '../../../configs/axiosApiCusomer';
import { getRelaseScope } from '../../../redux/activity.slice';
import { getReleaseDetail } from '../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import SearchInput from '../../Search/SearchInput';
import './ActivityScope.scss';
const ActivityScope = () => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const { releaseScopeList } = useAppSelector((state) => state.activity);
    const { releaseId } = useAppSelector((state) => state.release);

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [selectedIdDelete, setSelectedIdDelete] = useState<(number | null)[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    //Effect call API
    useEffect(() => {
        if (Number(releaseId) > 0) {
            const relaseScope = dispatch(getRelaseScope({ id: Number(releaseId), type: 2, valueSearch: '' }));
            return () => {
                relaseScope.abort();
            };
        }
    }, [dispatch, releaseId]);

    useEffect(() => {
        // setSelectedIdDelete(checkedKeys.map((key: any) => parseInt(key.split('-')[1])));
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

    const handleSearchScope = debounce((value: string) => {
        if (Number(releaseId) > 0) {
            dispatch(getRelaseScope({ id: Number(releaseId), type: 2, valueSearch: value }));
        }
    }, 700);

    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }, info: any) => {
        if (Array.isArray(checked)) {
            setCheckedKeys(checked);
        } else {
            setCheckedKeys(checked.checked);
        }
    };

    const onSelect = (selectedKeysValue: React.Key[], info: object | any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    // generate TreeData chaged title
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

    // handle changed Remove or Cancel buttons
    const handleRemoveOrCancelScope = async (type: string) => {
        if (type === 'cancel') {
            setCheckedKeys([]);
        }
        if (type === 'remove') {
            const param = {
                releaseId: Number(releaseId),
                requiredmentIds: selectedIdDelete,
            };
            const url = `${API_PATHS.API}/ReleaseRequiredmentScope/delete-release-requirement`;
            messageApi.success('Remove requirement successfully');
            const data = await axiosData(url, 'POST', param);
            setCheckedKeys([]);
            dispatch(getRelaseScope({ id: Number(releaseId), type: 2, valueSearch: '' }));
            dispatch(getReleaseDetail(Number(releaseId)));
            return data;
        }
    };
    const treeData = generateTreeData(releaseScopeList?.releaseScope || []);
    return (
        <div className="release-scope">
            <div className="release-scope__header">
                <SearchInput width="80%" onSearch={handleSearchScope} />
                <Button className="button-items w-48">
                    <span className="text-sm font-medium">Add Requirements</span>
                </Button>
            </div>
            <div className="release-scope__tree">
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={treeData}
                />
                {treeData.length === 0 && (
                    <div className="flex items-center justify-center text-sm">
                        <p>There no data</p>
                    </div>
                )}
            </div>
            {checkedKeys.length > 0 && (
                <div className="release-scope__footer">
                    <Button onClick={() => handleRemoveOrCancelScope('cancel')} className="text-xs !py-2">
                        Cancel
                    </Button>
                    <Button onClick={() => handleRemoveOrCancelScope('remove')} className="text-xs !py-2" danger>
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ActivityScope;
