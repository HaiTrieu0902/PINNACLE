import { Card, Select } from 'antd';
import { useState } from 'react';
import ContainerItem from '../container/ContainerItem';
import CreateOrDeleteRelease from './CreateOrDeleteRelease';
import './ReleaseItem.scss';
import ReleaseGridView from './components/ReleaseGridView';

const ReleaseItem = () => {
    const [formItem, setFormItem] = useState('1');
    const handleChangeSelect = (value: string) => {
        setFormItem(value);
    };

    return (
        <div className="flex justify-between p-2">
            <ContainerItem className="release-register" width="49.5%">
                <Card
                    title={<h3 className="custom-card-title">Release Register</h3>}
                    extra={
                        <Select
                            defaultValue="Grid View"
                            style={{ width: 140 }}
                            onChange={handleChangeSelect}
                            options={[
                                { value: 'folder', label: 'Grid View' },
                                { value: 'grid', label: 'Folder View' },
                            ]}
                        />
                    }
                    style={{ height: '100vh' }}
                >
                    <ReleaseGridView />
                </Card>
            </ContainerItem>

            <ContainerItem className="release-right" width="49.5%">
                <Card
                    title={<h3 className="custom-card-title">Release</h3>}
                    extra={<CreateOrDeleteRelease />}
                    style={{ height: '100vh' }}
                ></Card>
            </ContainerItem>
        </div>
    );
};

export default ReleaseItem;
