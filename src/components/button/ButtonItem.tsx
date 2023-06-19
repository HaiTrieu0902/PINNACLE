import { Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import './ButtonItem.scss';
interface ButtonItemProps {
    title: string;
    onClick?: (value: string) => void;
}

const ButtonItem = ({ title, onClick }: ButtonItemProps) => {
    const handleClick = () => {
        const value = 'Button clicked';
        onClick && onClick(value);
    };

    return (
        <Button onClick={handleClick} className="button-items">
            <span className="text-sm font-medium">{title}</span>
            <CaretDownOutlined style={{ fontSize: '11px' }} />
        </Button>
    );
};

export default ButtonItem;
