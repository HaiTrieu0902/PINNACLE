import React from 'react';
import './DashBroadItem.scss';
interface DashBroadItemProps {
    children: React.ReactNode;
    width: string;
}

const DashBroadItem = ({ width, children }: DashBroadItemProps) => {
    return (
        <div style={{ width: width }} className="dashbroad-branching">
            {children}
        </div>
    );
};

export default DashBroadItem;
