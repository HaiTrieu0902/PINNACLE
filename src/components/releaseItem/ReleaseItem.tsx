import { Card, Select } from 'antd';
import { useState } from 'react';
import ContainerItem from '../container/ContainerItem';
import './ReleaseItem.scss';

const ReleaseItem = () => {
    const [formItem, setFormItem] = useState('1');
    const handleChangeSelect = (value: string) => {
        setFormItem(value);
    };

    console.log('Release', formItem);
    return (
        <div className="flex justify-between p-2">
            <ContainerItem className="release-register" width="49.5%">
                <Card
                    title={<h3 className="custom-card-title">Release Register</h3>}
                    extra={
                        <Select
                            defaultValue="Test Cases"
                            style={{ width: 140 }}
                            onChange={handleChangeSelect}
                            options={[
                                { value: 'Test Cases', label: 'Test Cases' },
                                { value: 'Components', label: 'Components' },
                                { value: 'Test Steps', label: 'Test Steps' },
                            ]}
                        />
                    }
                ></Card>
            </ContainerItem>
            <ContainerItem className="release-right" width="49.5%">
                <Card title={<h3 className="custom-card-title">Release</h3>}></Card>
            </ContainerItem>
        </div>
    );
};

export default ReleaseItem;
