import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getReleaseFolderChart } from '../../../../redux/release.slice';
import { useAppDispatch, useAppSelector } from '../../../../store';
import SearchInput from '../../../Search/SearchInput';
import './ReleaseFolderView.scss';
import TreeFolder from './TreeFolder';
const ReleaseFolderView = () => {
    const dispatch = useAppDispatch();
    const { releasesFolderChartList } = useAppSelector((state) => state.release);
    const [searchValue, setSearchValue] = useState('');
    const handleOnSearchFolderView = (value: string) => {
        setSearchValue(value);
    };

    // get API
    useEffect(() => {
        const releaseFolderChart = dispatch(getReleaseFolderChart(searchValue));
        return () => {
            releaseFolderChart.abort();
        };
    }, [dispatch, searchValue]);

    return (
        <div className="release-card-body">
            <div className="release-folder-view">
                <div className="release-folder-view__header">
                    <SearchInput width="100%" onSearch={handleOnSearchFolderView} />
                    <Button className="button-folder-view">Create Root Folder</Button>
                </div>
                <div className="release-folder-view__tree-content">
                    <TreeFolder releasesFolderChartList={releasesFolderChartList} />
                </div>
            </div>
        </div>
    );
};

export default ReleaseFolderView;
