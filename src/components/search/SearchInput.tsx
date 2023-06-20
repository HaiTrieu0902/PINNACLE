import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useAppDispatch } from '../../store';
import { changeValueKeySearch } from '../../redux/release.slice';

interface SearchInputProps {
    width: string;
    onSearch: (value: string) => void;
}

const SearchInput = ({ width, onSearch }: SearchInputProps) => {
    const dispatch = useAppDispatch();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onSearch(value);
        dispatch(changeValueKeySearch(value));
    };
    return (
        <Input
            onChange={(e) => handleInputChange(e)}
            placeholder="Search"
            style={{ width: width }}
            className="input-search-item"
            prefix={<SearchOutlined style={{ fontSize: '20px', color: '#7E7E7E' }} />}
        />
    );
};

export default SearchInput;
