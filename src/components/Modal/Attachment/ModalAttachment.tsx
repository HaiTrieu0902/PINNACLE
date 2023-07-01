import { UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Image, Input, Modal, Row, Upload, UploadFile, UploadProps } from 'antd';
import { useState, useEffect } from 'react';
import './ModalAttachment.scss';

const ModalAttachment = () => {
    const [fileList, setFileList] = useState<UploadFile>();
    const [previewImage, setPreviewImage] = useState('');
    const [valueDescription, setValueDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const props: UploadProps = {
        beforeUpload: (file) => {
            setFileList(file);
            setPreviewImage(URL.createObjectURL(file));
            return false;
        },
    };

    /*Use Effect change value Description */
    useEffect(() => {
        if (fileList?.name) {
            setValueDescription(String(fileList?.name));
        }
    }, [fileList?.name]);

    const handleSubmitAttachment = () => {
        console.log('📢 [ModalAttachment.tsx:30]', valueDescription);
    };

    return (
        <Modal width={'520px'} open={true} footer={null}>
            <div className="flex flex-col">
                <div className="">
                    <h3 className="release-modal__header mb-4 capitalize">{'title'}</h3>
                    <Divider type="horizontal" className="-mt-2" />
                </div>

                <Row className="modal-attachment_content">
                    <Form
                        onFinish={handleSubmitAttachment}
                        className="w-full"
                        layout="inline"
                        initialValues={{ description: fileList?.name }}
                        id="ant-form_verify_create_update_attachment"
                    >
                        {fileList?.type?.startsWith('image/') && (
                            <Row className="attachment_preview_img">
                                <Image width={500} src={previewImage} />
                            </Row>
                        )}

                        {fileList?.name && (
                            <Row className="attachment_preview_filename">
                                <a href="" onClick={(e) => e.preventDefault()} className="attachment-modal__link-image">
                                    <div className="attachment-modal__file-info">
                                        <span className="attachment-modal__filename">{fileList?.name}</span>
                                    </div>
                                </a>
                            </Row>
                        )}

                        <Row className="w-full form__upload_attachment">
                            <Upload {...props}>
                                <Button
                                    type="primary"
                                    className="button-upload"
                                    icon={<UploadOutlined />}
                                    size={'small'}
                                >
                                    Upload
                                </Button>
                            </Upload>
                        </Row>

                        <Row className="w-full mt-2 form__description">
                            <Input
                                name="description"
                                value={valueDescription?.split('.')[0] || valueDescription}
                                onChange={(e) => setValueDescription(e.target.value)}
                                placeholder="Description..."
                                className="h-10 w-full"
                            />
                        </Row>

                        <Row justify={'end'} className="w-full mt-6 footer__form-attachment">
                            <Divider type="horizontal" className="" />
                            <div className="flex gap-1 -mt-3">
                                <Button className="h-10 w-20 mr-3">Cancel</Button>
                                <Button htmlType="submit" className={`button-items h-10 w-16`}>
                                    <span className="text-sm font-medium">Add</span>
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </Row>
            </div>
        </Modal>
    );
};

export default ModalAttachment;
