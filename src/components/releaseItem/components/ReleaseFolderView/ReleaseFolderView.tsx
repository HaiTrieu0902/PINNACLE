import { Button } from 'antd';
import SearchInput from '../../../Search/SearchInput';
import './ReleaseFolderView.scss';
import TreeFolder from './TreeFolder';
const ReleaseFolderView = () => {
    return (
        <div className="release-card-body">
            <div className="release-folder-view">
                <div className="release-folder-view__header">
                    {/* <SearchInput
                        width="100%"
                        onSearch={() => {
                            return;
                        }}
                    />
                    <Button className="button-folder-view">Create Root Folder</Button> */}
                </div>
                <div className="release-folder-view__tree-content">
                    <TreeFolder />
                </div>
            </div>
        </div>
    );
};

export default ReleaseFolderView;
