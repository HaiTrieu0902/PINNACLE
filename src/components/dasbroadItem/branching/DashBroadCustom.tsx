import React from 'react';

interface DashBroadCustomProps {
    title: string;
    value: string;
    color: string;
    direction?: string;
    bgColor: string;
}

const DashBroadCustom = ({ title, value, color, bgColor }: DashBroadCustomProps) => {
    return (
        <div className="dashborad-customer flex items-center gap-[46px]">
            <div
                style={{ backgroundColor: bgColor, border: `3px solid ${color}` }}
                className={`dashborad-circle flex items-center justify-center`}
            >
                <span>{value}</span>
            </div>
            <span style={{ color: color }} className="dashborad-circle-title">
                {title}
            </span>
        </div>
    );
};

export default DashBroadCustom;
