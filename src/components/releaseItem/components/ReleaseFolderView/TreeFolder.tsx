/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Space, Tree } from 'antd';
import React, { useState } from 'react';
import folder from '../../../../assets/folder.svg';
import plant from '../../../../assets/plant.svg';
import box from '../../../../assets/box.svg';
import { ReleasesFolderChart, releasesFolderChartList } from '../../../../types/release';
import './ReleaseFolderView.scss';

interface TreeFolderProps {
    releasesFolderChartList: releasesFolderChartList;
}

const DropdownTitle = ({ title, valueKey, children }: any) => {
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
            className: `dropdown-title ${
                valueKey?.substring(0, 2) === 'fd' && children?.length > 0 && 'dropdown-title_active'
            }`,
        },
        {
            key: '2',
            label: 'Rename Folder',
            className: `dropdown-title ${
                valueKey?.substring(0, 2) === 'fd' && children?.length > 0 && 'dropdown-title_active'
            }`,
        },
        {
            key: '3',
            label: 'Delete Folder',
            className: `dropdown-title ${
                valueKey?.substring(0, 2) === 'fd' && children?.length === 0 && 'dropdown-title_active'
            }`,
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
        },
        {
            key: '6',
            label: 'Detach Parent',
            className: `dropdown-title ${
                valueKey?.substring(0, 2) !== 'fd' && children?.length === 0 && 'dropdown-title_active'
            }`,
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
                title: <DropdownTitle node={node} title={node.title} valueKey={node.key} children={node.children} />,
                children: generateTreeData(node.children),
            };
        }
        return {
            ...node,
            title: <DropdownTitle node={node} valueKey={node.key} children={node.children} />,
        };
    });
};

const TreeFolder = ({ releasesFolderChartList }: TreeFolderProps) => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    console.log('releasesFolderChartList', releasesFolderChartList);

    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: object | any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const treeData = generateTreeData(releasesFolderChartList?.releasesFolderChart || []);

    return (
        <div>
            <Tree
                onExpand={onExpand}
                // expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                treeData={treeData}
            />
        </div>
    );
};

export default TreeFolder;
