import React from 'react';
import './ContainerLayout.scss';

interface ContainerLayoutProps {
    children: React.ReactNode;
}

export const ContainerLayout = ({ children }: ContainerLayoutProps) => {
    return <div className="container-layout-cp ">{children}</div>;
};
