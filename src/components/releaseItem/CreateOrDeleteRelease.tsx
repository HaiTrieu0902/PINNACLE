import { Button, Card, Col, DatePicker, DatePickerProps, Form, Image, Input, Modal, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { MessageContext } from '../../App';
import addIcon from '../../assets/icon/addIcon.svg';
import addIconActive from '../../assets/icon/addIconActive.svg';
import deleteIcon from '../../assets/icon/deleteIcon.svg';
import deleteActive from '../../assets/icon/deleteIconActive.svg';
import { API_PATHS } from '../../configs/api';
import { axiosData } from '../../configs/axiosApiCusomer';
import { useAppDispatch, useAppSelector } from '../../store';
import { ParamReleaseAdd, ParamReleaseDelete } from '../../types/release';
import './ReleaseItem.scss';
import { getReleaseChart } from '../../redux/release.slice';

type IconType = typeof addIcon | typeof deleteIcon;
const CreateOrDeleteRelease = () => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const { releaseTypeList, releasesGanttChartList, releaseId } = useAppSelector((state) => state.release);
    const { user } = useAppSelector((state) => state.auth);
    const [form] = Form.useForm();
    const [formDelete] = Form.useForm();
    const [startDate, setStartDate] = useState<dayjs.Dayjs | any>(dayjs());
    const [endDate, setEndDate] = useState<dayjs.Dayjs | any>(dayjs());
    const [newReleaseId, setNewReleaseId] = useState<number>(0);
    const [hoveredIcon, setHoveredIcon] = useState<IconType | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // handle add release
    const handleFormAddSubmit = async (values: ParamReleaseAdd) => {
        const param: ParamReleaseAdd = {
            releaseId: Number(newReleaseId),
            releaseLabel: values.releaseLabel,
            releaseTitle: values.releaseTitle,
            releaseDescription: values.releaseDescription,
            releaseComments: values.releaseComments,
            releaseOwner: user?.userId,
            releaseWorkflow: 'Draft',
            releaseBusinessImportance: values.releaseBusinessImportance,
            releaseAssignedTo: user?.userId,
            releaseCreatedBy: user?.userId,
            targetReleaseStartDate: values.targetReleaseStartDate,
            targetReleaseEndDate: values.targetReleaseEndDate,
            targetReleaseDurationDays: Number(endDate.diff(startDate, 'day')) + 1,
            releaseType: values.releaseType,
            releaseParentId: null,
            logicalDelete: 0,
            releaseAssignedOn: '2023-06-22T04:37:30.277Z',
            releaseCreatedOn: '2023-06-22T04:37:30.277Z',
        };
        const url = `${API_PATHS.API}/Releases/create-release`;
        const data = await axiosData(url, 'POST', param);
        form.resetFields();
        dispatch(getReleaseChart());
        setOpenAdd(false);
        messageApi.success(data.message);
        return data;
    };

    // console.log('duration', duration);

    // handle delete release
    const handleFormDeleteSubmit = async (values: ParamReleaseDelete) => {
        const param = {
            releaseId: releaseId,
            deleteReason: values.deleteReason,
        };
        const url = `${API_PATHS.API}/Releases/delete-release`;
        const data = await axiosData(url, 'DELETE', param);
        formDelete.resetFields();
        dispatch(getReleaseChart());
        setOpenDelete(false);
        messageApi.success(`ID ${releaseId} was delete successfully`);
        return data;
    };

    // handle show modal add
    const showModalAdd = async () => {
        setOpenAdd(true);
        const url = `${API_PATHS.API}/Releases/get-new-release-id`;
        const data = await axiosData(url, 'GET');
        setNewReleaseId(Number(data.releaseId));
    };
    const handleCancelModalAdd = () => {
        setOpenAdd(false);
    };

    // handle show modal delete
    const showModalDelete = async () => {
        setOpenDelete(true);
    };
    const handleCancelModalDelete = () => {
        setOpenDelete(false);
    };

    // handle hover icons
    const handleIconHover = (icon: IconType) => {
        setHoveredIcon(icon);
    };
    const handleIconMouseLeave = () => {
        setHoveredIcon(null);
    };

    // handle change date
    const handleDateChange: DatePickerProps['onChange'] = (date, name) => {
        if (name === 'targetReleaseStartDate') {
            setStartDate(date);
        } else if (name === 'targetReleaseEndDate') {
            setEndDate(date);
        }
    };

    return (
        <div className="create-release-container">
            <div className="flex gap-4">
                <Image
                    onMouseEnter={() => handleIconHover(addIcon)}
                    onMouseLeave={handleIconMouseLeave}
                    onClick={showModalAdd}
                    preview={false}
                    src={hoveredIcon === addIcon ? addIconActive : addIcon}
                    width={20}
                    height={20}
                    alt="Add"
                    style={{ cursor: 'pointer' }}
                ></Image>
                <Image
                    onMouseEnter={() => handleIconHover(deleteIcon)}
                    onMouseLeave={handleIconMouseLeave}
                    preview={false}
                    onClick={showModalDelete}
                    src={hoveredIcon === deleteIcon ? deleteActive : deleteIcon}
                    width={20}
                    height={20}
                    alt="Delete"
                    style={{ cursor: 'pointer' }}
                ></Image>
            </div>
            <div className="modal-release-add">
                <Modal width={'800px'} open={openAdd} onCancel={handleCancelModalAdd} closable={false} footer={null}>
                    <div className="flex flex-col add-new-modal">
                        <h3 className="add-new-modal__header mb-2">Create new release</h3>
                        <Form
                            form={form}
                            onFinish={handleFormAddSubmit}
                            layout="inline"
                            className="w-full"
                            id="ant-form_verify"
                        >
                            {/* Release sumary */}
                            <Card
                                className="sub-title-common"
                                title="Summary"
                                bordered={true}
                                size="small"
                                style={{ width: '100%' }}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={8}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">Label: </span>
                                            <Form.Item
                                                name="releaseLabel"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'A Release must have a Label',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="Please enter"
                                                    className="input-inline-custom w-full"
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">Title :</span>
                                            <Form.Item
                                                name="releaseTitle"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'A Release must have a Label',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="Please enter"
                                                    className="input-inline-custom !w-[228px] ml-1"
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">
                                                Workflow : <span className="input-inline-custom">Draft</span>
                                            </span>
                                            <span style={{ height: '30px' }}></span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className="mt-3">
                                    <Col span={8}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">
                                                Id : <span className="input-inline-custom">{newReleaseId}</span>
                                            </span>
                                            <span style={{ height: '30px' }}></span>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">Type :</span>
                                            <Form.Item
                                                name="releaseType"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'A Release must have a Type defined',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    className="select-inline-custom"
                                                    defaultValue="Select"
                                                    style={{ width: 228 }}
                                                    options={releaseTypeList.releaseType
                                                        .filter((item) => item.releaseTypeDescription !== null)
                                                        .map((item) => ({
                                                            value: item.releaseTypeId,
                                                            label: item.releaseTypeDescription,
                                                        }))}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">
                                                Owner :{' '}
                                                <span className="input-inline-custom !text-[#dd5c86]">
                                                    {user.fullname ? user.fullname : 'Gerry Payne'}
                                                </span>
                                            </span>
                                            <span style={{ height: '30px' }}></span>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Release Schedule */}
                            <Card
                                className="sub-title-common mt-2"
                                title="Release Schedule"
                                bordered={true}
                                size="small"
                                style={{ width: '100%' }}
                            >
                                <Row gutter={[6, 9]}>
                                    <Col span={9}>
                                        <div className="flex items-center gap-2">
                                            <span className="label-common">Start Date:</span>

                                            <Form.Item name="targetReleaseStartDate">
                                                <DatePicker
                                                    name="targetReleaseStartDate"
                                                    onChange={(date, name) =>
                                                        handleDateChange(date, 'targetReleaseStartDate')
                                                    }
                                                    defaultValue={startDate}
                                                    format={'DD-MM-YYYY'}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={9}>
                                        <div className="flex items-center gap-2">
                                            <span className="label-common">End Date :</span>
                                            <Form.Item name="targetReleaseEndDate">
                                                <DatePicker
                                                    name="targetReleaseEndDate"
                                                    onChange={(date, name) =>
                                                        handleDateChange(date, 'targetReleaseEndDate')
                                                    }
                                                    defaultValue={endDate}
                                                    format={'DD-MM-YYYY'}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="flex gap-3 mt-1 items-center ml-9">
                                            <span className="label-common">
                                                Duration:{' '}
                                                <span className="input-inline-custom">
                                                    {Number(endDate.diff(startDate, 'day')) + 1}
                                                </span>
                                            </span>
                                            <span className="label-common">Days</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Release Importance */}
                            <Card
                                className="sub-title-common mt-2"
                                title="Release Importance"
                                bordered={true}
                                size="small"
                                style={{ width: '100%' }}
                            >
                                <Row gutter={[10, 10]}>
                                    <Col span={24}>
                                        <div className="flex items-center">
                                            <span className="label-common w-[23%]">Business Importance:</span>
                                            <Form.Item
                                                className="w-[76%]"
                                                name="releaseBusinessImportance"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'A Release must have a Business Importance',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    className="select-inline-custom !w-[100%]"
                                                    defaultValue="Select"
                                                    style={{ width: 150 }}
                                                    options={releasesGanttChartList?.releasesGanttChart.map((item) => ({
                                                        value: item.businessImportanceId,
                                                        label: item.businessImportanceDescription,
                                                    }))}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Release Detail */}
                            <Card
                                className="sub-title-common mt-2"
                                title="Release Detail"
                                bordered={true}
                                size="small"
                                style={{ width: '100%' }}
                            >
                                <Row gutter={[10, 10]}>
                                    <Col span={24}>
                                        <div className="flex flex-col">
                                            <span className="label-common">Description :</span>
                                            <Form.Item name="releaseDescription">
                                                <TextArea style={{ minHeight: 80, resize: 'none', color: '#6bb2d6' }} />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <div className="flex flex-col">
                                            <span className="label-common">Comments : :</span>

                                            <Form.Item name="releaseComments">
                                                <TextArea style={{ minHeight: 80, resize: 'none', color: '#6bb2d6' }} />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Button Action */}
                            <Row justify={'end'} className="w-full">
                                <Col>
                                    <div className="flex gap-2 mt-2 mr-1">
                                        <Button onClick={handleCancelModalAdd} className="h-10 w-20">
                                            Cancel
                                        </Button>
                                        <Button
                                            htmlType="submit"
                                            className="button-items h-10 w-20 items-center justify-center"
                                        >
                                            <span>Create</span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </div>

            <div className="modal-release-delete">
                <Modal
                    width={'520px'}
                    open={openDelete}
                    onCancel={handleCancelModalDelete}
                    closable={false}
                    footer={null}
                    className="delete-container-modal"
                >
                    <div className="flex items-center flex-col">
                        <h3 className="delete-new-modal__header ">Delete Release</h3>
                        <p className="delete-modal__title ">Please Enter the Reason for Deleting the Release</p>
                        <Form
                            form={formDelete}
                            onFinish={handleFormDeleteSubmit}
                            layout="inline"
                            className="w-full"
                            id="ant-form_verify_delete"
                        >
                            <div className="w-full mt-2 delete-border-footer">
                                <Form.Item
                                    name="deleteReason"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'A Reason has not been entered.',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please reason" className="h-10 ml-1 w-full" />
                                </Form.Item>
                            </div>
                            <Row justify={'end'} className="w-full">
                                <Col>
                                    <div className="flex gap-2 mt-2 mr-1 delete-footer">
                                        <Button onClick={handleCancelModalDelete} className="h-10 w-20">
                                            Cancel
                                        </Button>
                                        <Button
                                            htmlType="submit"
                                            className="button-items h-10 w-20 items-center justify-center"
                                        >
                                            <span>OK</span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default CreateOrDeleteRelease;
