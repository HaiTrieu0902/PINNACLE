import { Card, Select } from 'antd';
import { useState, useEffect } from 'react';
import ContainerItem from '../Container/ContainerItem';
import CreateOrDeleteRelease from '../ReleaseItem/CreateOrDeleteRelease';
import ReleaseDetail from '../ReleaseItem/components/ReleaseDetail/ReleaseDetail';
import ReleaseFolderView from '../ReleaseItem/components/ReleaseFolderView/ReleaseFolderView';
import ReleaseGridView from '../ReleaseItem/components/ReleaseGridView/ReleaseGridView';
import './ReleaseItem.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBusinessImportance } from '../../redux/release.slice';
const ReleaseItem = () => {
    const [formItem, setFormItem] = useState('grid');
    const dispatch = useAppDispatch();
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
                                { value: 'grid', label: 'Grid View' },
                                { value: 'folder', label: 'Folder View' },
                            ]}
                        />
                    }
                    style={{ height: '100vh' }}
                >
                    {formItem === 'grid' && <ReleaseGridView />}
                    {formItem === 'folder' && <ReleaseFolderView />}
                </Card>
            </ContainerItem>

            <ContainerItem className="release-right" width="49.5%">
                <Card
                    title={<h3 className="custom-card-title">Release</h3>}
                    extra={<CreateOrDeleteRelease />}
                    style={{ height: '100vh' }}
                >
                    <ReleaseDetail />
                </Card>
            </ContainerItem>
        </div>
    );
};

export default ReleaseItem;
