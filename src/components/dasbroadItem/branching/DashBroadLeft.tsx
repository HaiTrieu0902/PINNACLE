import React from 'react';

interface DashBroadLeftProps {
    width: string;
}

const DashBroadLeft = ({ width }: DashBroadLeftProps) => {
    return <div style={{ width: width }}>DashBroadLeft</div>;
};

export default DashBroadLeft;
