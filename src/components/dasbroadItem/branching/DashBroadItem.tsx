import React from 'react';
import './DashBroadItem.scss';
interface DashBroadItemProps {
    children: React.ReactNode;
    width: string;
    height: string;
}

const DashBroadItem = ({ width, height, children }: DashBroadItemProps) => {
    return (
        <div style={{ width: width, height: height }} className="dashbroad-branching">
            {children}
        </div>
    );
};

export default DashBroadItem;
