/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dropdown, Space, Tree, Input, Menu } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useState, useMemo } from 'react';
import folder from '../../../../assets/folder.svg';
import { SearchOutlined } from '@ant-design/icons';

import './ReleaseFolderView.scss';

const generateData = (_level: number, _preKey?: React.Key, _tns?: DataNode[]) => {
    const preKey = _preKey || '0';
    const tns = _tns || defaultData;

    const children: React.Key[] = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        const label = key;
        tns.push({ title: label, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};

const x = 3;
const y = 2;
const z = 1;
const defaultData: DataNode[] = [];
generateData(z, undefined, defaultData);

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: DataNode[]) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key } = node;
        dataList.push({ key, title: key as string });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(defaultData);

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey!;
};

const DropdownTitle = ({ title }: any) => {
    const items = [
        {
            key: '1',
            label: 'Create Folder',
            className: 'dropdown-title_active',
        },
        {
            key: '2',
            label: 'Rename Folder',
            className: 'dropdown-title_active',
        },
        {
            key: '3',
            label: 'Delete Folder',
            className: 'dropdown-title',
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
            className: 'dropdown-title',
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={['contextMenu']}>
            <Space>
                <div className="flex items-center gap-2">
                    <img src={folder} alt="" />
                    <p>{title}</p>
                </div>
            </Space>
        </Dropdown>
    );
};

const TreeFolder = () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, defaultData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys as React.Key[]);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const generateTreeNodes = (data: any) => {
        // Hàm đệ quy để tạo các node cho cây
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.map((item: any) => {
            const strTitle = item.title ? item.title.toString() : '';
            const index = strTitle.indexOf(searchValue);
            const beforeStr = strTitle.substring(0, index);
            const afterStr = strTitle.slice(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span className="site-tree-search-value">{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{strTitle}</span>
                );
            if (item.children) {
                return {
                    title: <DropdownTitle title={title} />,
                    key: item.key,
                    children: generateTreeNodes(item.children),
                };
            }
            return {
                title: <DropdownTitle title={title} />,
                key: item.key,
            };
        });
    };

    const treeData = useMemo(() => {
        return generateTreeNodes(defaultData);
    }, [generateTreeNodes]);
    return (
        <div>
            <Input
                style={{ marginBottom: 8, width: '73%' }}
                prefix={<SearchOutlined style={{ fontSize: '20px', color: '#7E7E7E' }} />}
                placeholder="Search"
                onChange={onChange}
            />
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={treeData}
            />
        </div>
    );
};

export default TreeFolder;
