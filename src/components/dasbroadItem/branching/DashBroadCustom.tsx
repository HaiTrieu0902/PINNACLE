interface DashBroadCustomProps {
    title: string;
    value: string;
    color: string;
    direction?: 'column' | 'row';
}

const DashBroadCustom = ({ title, value, color, direction }: DashBroadCustomProps) => {
    return (
        <div
            className={`dashborad-customer flex items-center gap-[46px]  ${
                direction === 'column' && 'flex-col-reverse gap-[12px]'
            }`}
        >
            <div
                style={{ border: `3px solid ${color}` }}
                className={`dashborad-circle flex items-center justify-center relative`}
            >
                <span style={{ backgroundColor: color, opacity: 0.1 }} className="dashborad-circle-value"></span>
                <p className="absolute text-ellipsis overflow-hidden w-12 text-center">{value}</p>
            </div>
            <span style={{ color: color }} className="dashborad-circle-title">
                {title}
            </span>
        </div>
    );
};

export default DashBroadCustom;
