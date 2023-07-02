import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Image, Input, Modal, Row, Tooltip, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { getAttachmentDetail, resetValueAttachmentDetail } from '../../../redux/activity.slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import './ModalAttachment.scss';

interface ModalAttachmentProps {
    isActive?: boolean;
    title?: string;
    host?: string;
    type?: string;
    idAttachment?: number | string;
    onCancel: (value: boolean) => void;
}

const ModalAttachment = ({ isActive, title, type, idAttachment, onCancel }: ModalAttachmentProps) => {
    const dispatch = useAppDispatch();
    const { attachmentDetail } = useAppSelector((state) => state.activity);
    const [fileList, setFileList] = useState<UploadFile>();
    const [previewImage, setPreviewImage] = useState('');
    const [valueDescription, setValueDescription] = useState('');
    const [fileName, setFileName] = useState('');
    const [attachmentData, setAttachmentData] = useState({ fileName: '', valueDescription: '' });

    /*Use Effect call API attachment detail */
    useEffect(() => {
        if (idAttachment) {
            const attachmentDetail = dispatch(getAttachmentDetail({ attachmentId: Number(idAttachment) }));
            return () => {
                attachmentDetail.abort();
            };
        }
    }, [dispatch, idAttachment]);

    /*Use Effect change fileName */
    useEffect(() => {
        if (attachmentDetail?.attachment && !fileList?.name) {
            setFileName(String(attachmentDetail?.attachment?.fileName));
        }
        if (fileList?.name) {
            setFileName(String(fileList?.name));
        }
    }, [fileList?.name, attachmentDetail?.attachment]);

    /*Use Effect change value Description */
    useEffect(() => {
        if (attachmentDetail?.attachment && !fileList?.name) {
            setValueDescription(String(attachmentDetail?.attachment?.attachmentDescription));
        }
        if (fileList?.name) {
            setValueDescription(String(fileList?.name));
        }
    }, [fileList?.name, attachmentDetail?.attachment]);

    /* Props for Upload */
    const props: UploadProps = {
        beforeUpload: (file) => {
            setFileList(file);
            setPreviewImage(URL.createObjectURL(file));
            return false;
        },
    };

    /* handle close modal */
    const handleCancelModal = () => {
        onCancel(false);
        setFileList(undefined);
        setValueDescription('');
        setPreviewImage('');
        setFileName('');
        dispatch(resetValueAttachmentDetail());
    };

    const handleSubmitAttachment = () => {
        console.log('📢 [ModalAttachment.tsx:30]', valueDescription);
        onCancel(false);
    };

    console.log('attachmentDetail?.attachment', attachmentDetail?.attachment?.fileObjectUrl);
    return (
        <Modal width={'520px'} open={isActive} onCancel={handleCancelModal} footer={null}>
            <div className="flex flex-col">
                <div className="modal__attachment_header">
                    <h3 className="release-modal__header mb-4 capitalize">{title}</h3>
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

                        {fileName && (
                            <Row className="attachment_preview_filename">
                                {attachmentDetail?.attachment && attachmentDetail?.attachment?.fileObjectUrl ? (
                                    <Tooltip title="View attachment">
                                        <a
                                            target="_blank"
                                            href={attachmentDetail?.attachment?.fileObjectUrl}
                                            className="attachment-modal__link-image"
                                        >
                                            <div className="attachment-modal__file-info relative">
                                                <span className="attachment-modal__filename">{fileName}</span>
                                                <span className="relative right-2 flex items-center">
                                                    <DownloadOutlined />
                                                </span>
                                            </div>
                                        </a>
                                    </Tooltip>
                                ) : (
                                    <a
                                        href=""
                                        onClick={(e) => e.preventDefault()}
                                        className="attachment-modal__link-image"
                                    >
                                        <div className="attachment-modal__file-info">
                                            <span className="attachment-modal__filename">{fileName}</span>
                                        </div>
                                    </a>
                                )}
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
                                <Button onClick={handleCancelModal} className="h-10 w-20 mr-3">
                                    Cancel
                                </Button>
                                <Button
                                    htmlType="submit"
                                    className={`button-items h-10  ${type == 'update' ? 'w-20' : 'w-16'} `}
                                >
                                    <span className="text-sm font-medium">{type == 'update' ? 'Update' : 'Add'}</span>
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
