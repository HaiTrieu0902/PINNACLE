import React, { useState } from 'react';
import { Tree, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

const DropdownTitle = ({ title }: any) => (
    <Dropdown
        overlay={
            <Menu>
                <Menu.Item key={`${title}-dropdown`}>Dropdown Item 1</Menu.Item>
                <Menu.Item key={`${title}-dropdown`}>Dropdown Item 2</Menu.Item>
                <Menu.Item key={`${title}-dropdown`}>Dropdown Item 3</Menu.Item>
            </Menu>
        }
        trigger={['click']}
    >
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                {title}
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
);

const generateTreeData = (data: DataNode[]): DataNode[] => {
    return data.map((node) => {
        const { title, children } = node;
        const updatedTitle = <DropdownTitle title={title} />;

        if (children) {
            return {
                ...node,
                title: updatedTitle,
                children: generateTreeData(children),
            };
        }

        return {
            ...node,
            title: updatedTitle,
        };
    });
};

const originalTreeData: DataNode[] = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                        children: [
                            { title: '0-0-0-0-0', key: '0-0-0-0-0' },
                            { title: '0-0-0-0-1', key: '0-0-0-0-1' },
                            { title: '0-0-0-0-2', key: '0-0-0-0-2' },
                        ],
                    },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

const TreeFolder = () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const treeData = generateTreeData(originalTreeData);

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
