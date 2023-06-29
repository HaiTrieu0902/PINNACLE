import { Button } from 'antd';
import SearchInput from '../../Search/SearchInput';
import './ActivityScope.scss';

const ActivityScope = () => {
    return (
        <div className="release-scope">
            <div className="release-scope__header">
                <SearchInput
                    width="80%"
                    onSearch={() => {
                        return;
                    }}
                />
                <Button className="button-items w-48">
                    <span className="text-sm font-medium">Add Requirements</span>
                </Button>
            </div>
        </div>
    );
};

export default ActivityScope;
