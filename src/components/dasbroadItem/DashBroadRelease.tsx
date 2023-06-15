import SubHeader from '../Header/SubHeader';
import DashBroadItem from './branching/DashBroadItem';
import { Pie } from '@ant-design/plots';
import { configRelease } from '../../context/dataDashbroad';
import DashBroadCustom from './branching/DashBroadCustom';

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
                <div className="ml-8 mt-9 flex flex-col gap-8">
                    <DashBroadCustom
                        color="#64BFE8"
                        bgColor="rgba(100, 191, 232, 0.1)"
                        value="44"
                        title="Release with scope "
                    />
                    <DashBroadCustom
                        color="#739EF9"
                        bgColor="rgba(115, 158, 249, 0.1)"
                        value="15"
                        title="Release with no scope"
                    />
                    <DashBroadCustom
                        color="#F2B41C"
                        bgColor="rgba(242, 180, 28, 0.1)"
                        value="90"
                        title="Release requirements remaining to be passed"
                    />
                    <DashBroadCustom
                        color="#71C09A"
                        bgColor="rgba(113, 192, 154, 0.1)"
                        value="88"
                        title="Release tests remaining to be passed"
                    />
                </div>
            </DashBroadItem>
        </div>
    );
};

export default DashBroadRelease;
