import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { Pie } from '@ant-design/plots';
import { configRelease } from '../../context/dataDashbroad';

const DashBroadRelease = () => {
    return (
        <div className="flex w-full gap-2">
            <DashBroadItem width={'55%'}>
                <SubHeader title="Release Workflow" size={14} color="black" />
                <div className="-ml-10">
                    <Pie {...configRelease} />
                </div>
            </DashBroadItem>

            <DashBroadItem width={'45%'}>
                <SubHeader title="Custom Release" size={14} color="black" />
            </DashBroadItem>
        </div>
    );
};

export default DashBroadRelease;
