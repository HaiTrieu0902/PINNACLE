import React from 'react';
import DashBroadRight from './branching/DashBroadRight';
import DashBroadLeft from './branching/DashBroadLeft';

const DashBroadRelease = () => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadRight width={'55%'} />
            <DashBroadLeft width={'45%'} />
        </div>
    );
};

export default DashBroadRelease;
