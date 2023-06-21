import React from 'react';
import { Card } from 'antd';
const ReleaseDetail = () => {
    return (
        <div>
            <div className="">
                <Card size="small" title="Summary" bordered={false} style={{ width: '100%' }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
            <div className="release-right__content"></div>
        </div>
    );
};

export default ReleaseDetail;
