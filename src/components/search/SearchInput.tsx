import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

interface SearchInputProps {
    width: string;
    onSearch: (value: string) => void;
}

const SearchInput = ({ width, onSearch }: SearchInputProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onSearch(value);
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
