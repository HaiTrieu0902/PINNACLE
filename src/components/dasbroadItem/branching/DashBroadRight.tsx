import React from 'react';

interface DashBroadRightProps {
    width: string;
}

const DashBroadRight = ({ width }: DashBroadRightProps) => {
    return <div style={{ width: width }}>DashBroadRight</div>;
};

export default DashBroadRight;
