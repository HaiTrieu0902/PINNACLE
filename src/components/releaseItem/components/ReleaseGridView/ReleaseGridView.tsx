import { Button } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { arrangeReleasesGridCharTable } from '../../../../redux/release.slice';
import { useAppDispatch } from '../../../../store';
import SearchInput from '../../../Search/SearchInput';
import TableData from '../../../Table/TableData';
import TableView from '../../../Table/TableView';
import './ReleaseGridView.scss';
const ReleaseGridView = () => {
    const dispatch = useAppDispatch();
    const [valueActivePath, setValueActivePath] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleClickPath = () => {
        setValueActivePath((prev) => !prev);
        dispatch(arrangeReleasesGridCharTable(valueActivePath));
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
                        <CaretDownOutlined style={{ fontSize: '11px' }} />
                    ) : (
                        <CaretUpOutlined style={{ fontSize: '11px' }} />
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
