interface DashBroadCustomProps {
    title: string;
    value: string;
    color: string;
    direction?: 'column' | 'row';
}

const DashBroadCustom = ({ title, value, color, direction }: DashBroadCustomProps) => {
    return (
        <div
            className={`dashborad-customer flex items-center ${
                direction === 'column' ? 'flex-col-reverse' : 'gap-[46px]'
            }`}
        >
            <div
                style={{ border: `3px solid ${color}` }}
                className={`dashborad-circle flex items-center justify-center relative  ${
                    direction === 'column' && 'mt-8'
                }`}
            >
                <span style={{ backgroundColor: color, opacity: 0.1 }} className="dashborad-circle-value"></span>
                <p className="absolute text-ellipsis overflow-hidden w-12 text-center">{value}</p>
            </div>
            <p
                style={{ color: color }}
                className={`dashborad-circle-title text-center ${direction === 'column' && 'h-4'}`}
            >
                {title}
            </p>
        </div>
    );
};

export default DashBroadCustom;
