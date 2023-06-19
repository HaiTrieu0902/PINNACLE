import React from 'react';

interface ContainerItem {
    children: React.ReactNode;
    className: string;
    width: string;
}

const ContainerItem = ({ children, className, width }: ContainerItem) => {
    return (
        <div className={`container-item-layout ${className}`} style={{ width: width }}>
            {children}
        </div>
    );
};

export default ContainerItem;
