interface DashBroadCustomProps {
    title: string;
    value: string;
    color: string;
    direction?: string;
}

const DashBroadCustom = ({ title, value, color }: DashBroadCustomProps) => {
    return (
        <div className="dashborad-customer flex items-center gap-[46px]">
            <div
                style={{ border: `3px solid ${color}` }}
                className={`dashborad-circle flex items-center justify-center relative`}
            >
                <span style={{ backgroundColor: color, opacity: 0.2 }} className="dashborad-circle-value"></span>
                <p className="absolute">{value}</p>
            </div>
            <span style={{ color: color }} className="dashborad-circle-title">
                {title}
            </span>
        </div>
    );
};

export default DashBroadCustom;
