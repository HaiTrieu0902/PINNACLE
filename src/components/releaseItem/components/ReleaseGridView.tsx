import { Button } from 'antd';

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import SearchInput from '../../search/SearchInput';
import './ReleaseConmonent.scss';
import { useState } from 'react';
import TableView from '../../table/TableView';
import TableData from '../../table/TableData';
const ReleaseGridView = () => {
    const [valueActivePath, setValueActivePath] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleClickPath = () => {
        setValueActivePath((prev) => !prev);
    };
    const handleOnSearchGridView = (value: string) => {
        setSearchValue(value);
    };

    return (
        <div className="release-card-body">
            <div className="release-layout-header">
                <Button onClick={handleClickPath} className="button-items">
                    <span className="text-sm font-medium">Path</span>
                    {valueActivePath ? (
                        <CaretUpOutlined style={{ fontSize: '11px' }} />
                    ) : (
                        <CaretDownOutlined style={{ fontSize: '11px' }} />
                    )}
                </Button>
                <SearchInput width="220px" onSearch={handleOnSearchGridView} />
            </div>
            <div className="mt-3">
                <TableView />
            </div>
            <div className="grid-view__data">
                <TableData />
            </div>
        </div>
    );
};

export default ReleaseGridView;
