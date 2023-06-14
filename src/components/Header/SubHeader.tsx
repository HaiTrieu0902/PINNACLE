interface SubHeaderProps {
    title: string;
    color: string;
    size?: number;
}

const SubHeader = ({ title, color, size }: SubHeaderProps) => {
    return (
        <div>
            <span style={{ color: color, fontSize: `${size}px` }}>{title}</span>
        </div>
    );
};

export default SubHeader;
