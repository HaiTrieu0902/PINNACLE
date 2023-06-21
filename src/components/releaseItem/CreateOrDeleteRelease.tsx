import { Button, Card, Col, DatePicker, Form, Image, Input, Modal, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import addIcon from '../../assets/icon/addIcon.svg';
import addIconActive from '../../assets/icon/addIconActive.svg';
import deleteIcon from '../../assets/icon/deleteIcon.svg';
import deleteActive from '../../assets/icon/deleteIconActive.svg';
import './ReleaseItem.scss';
import TextArea from 'antd/es/input/TextArea';
type IconType = typeof addIcon | typeof deleteIcon;
const CreateOrDeleteRelease = () => {
    const [hoveredIcon, setHoveredIcon] = useState<IconType | null>(null);

    const [openAdd, setOpenAdd] = useState(false);

    const onFinish = (values: any) => {
        console.log(values);
    };

    const showModalAdd = () => {
        setOpenAdd(true);
    };
    const handleCancelModalAdd = () => {
        setOpenAdd(false);
    };

    // handle hover icons
    const handleIconHover = (icon: IconType) => {
        setHoveredIcon(icon);
    };
    const handleIconMouseLeave = () => {
        setHoveredIcon(null);
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
                    src={hoveredIcon === deleteIcon ? deleteActive : deleteIcon}
                    width={20}
                    height={20}
                    alt="Delete"
                    style={{ cursor: 'pointer' }}
                ></Image>
            </div>
            <div>
                <Modal width={'800px'} open={openAdd} onCancel={handleCancelModalAdd} closable={false} footer={null}>
                    <div className="flex flex-col add-new-modal">
                        <h3 className="add-new-modal__header mb-2">Create new release</h3>
                        <Form onFinish={onFinish} layout="inline" className="w-full" id="ant-form_verify">
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
                                                name="label"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'A Release must have a Label',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Please enter" className="input-inline-custom" />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">Title :</span>
                                            <Form.Item
                                                name="title"
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
                                                Id : <span className="input-inline-custom">524</span>
                                            </span>
                                            <span style={{ height: '30px' }}></span>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">Type :</span>
                                            <Form.Item
                                                name="type"
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
                                                    options={[
                                                        { value: 'grid', label: 'Grid View' },
                                                        { value: 'folder', label: 'Folder View' },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="flex gap-2 items-center">
                                            <span className="label-common">
                                                Owner : <span className="input-inline-custom">Gerry Payne</span>
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
                                            <DatePicker
                                                value={dayjs('2022-05-13', 'YYYY-MM-DD')}
                                                format={'YYYY-MM-DD'}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={9}>
                                        <div className="flex items-center gap-2">
                                            <span className="label-common">End Date :</span>
                                            <DatePicker
                                                value={dayjs('2022-05-13', 'YYYY-MM-DD')}
                                                format={'YYYY-MM-DD'}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className="flex gap-3 mt-1 items-center ml-9">
                                            <span className="label-common">
                                                Duration: <span className="input-inline-custom">1</span>
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
                                                name="business"
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
                                                    options={[
                                                        { value: 'grid', label: 'Grid View' },
                                                        { value: 'folder', label: 'Folder View' },
                                                    ]}
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
                                            <TextArea style={{ minHeight: 80, resize: 'none', color: '#6bb2d6' }} />
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <div className="flex flex-col">
                                            <span className="label-common">Comments : :</span>
                                            <TextArea style={{ minHeight: 80, resize: 'none', color: '#6bb2d6' }} />
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
        </div>
    );
};

export default CreateOrDeleteRelease;
