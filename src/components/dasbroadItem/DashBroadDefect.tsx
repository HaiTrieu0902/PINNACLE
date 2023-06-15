import { Pie } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { configDefects } from '../../context/dataDashbroad';
import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { useEffect, useState } from 'react';
import { columnDefect } from '../../context/dataDashbroad';

const DashBroadDefect = () => {
    // const [data, setData] = useState([]);

    // console.log('data', data);
    // useEffect(() => {
    //     asyncFetch();
    // }, []);

    // const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
    //         .then((response) => response.json())
    //         .then((json) => setData(json))
    //         .catch((error) => {
    //             console.log('fetch data failed', error);
    //         });
    // };
    const config = {
        data: columnDefect,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: false,
        columnStyle: {},
    };

    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Requiment Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configDefects} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'}>
                <SubHeader title="Defect Trend" size={14} color="black" />
                <div>
                    <Column {...config} />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadDefect;
