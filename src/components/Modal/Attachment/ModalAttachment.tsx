/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Image, Input, Modal, Row, Tooltip, Upload, UploadFile, UploadProps } from 'antd';
import { Blob } from 'buffer';
import { useEffect, useState } from 'react';
import { API_PATHS } from '../../../configs/api';
import { axiosData } from '../../../configs/axiosApiCusomer';
import { getAttachmentDetail, getRelaseAttachments, resetValueAttachmentDetail } from '../../../redux/activity.slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import './ModalAttachment.scss';
import { useContext } from 'react';
import { MessageContext } from '../../../App';

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
    const messageApi: any = useContext(MessageContext);
    const { releaseId } = useAppSelector((state) => state.release);
    const { attachmentDetail } = useAppSelector((state) => state.activity);
    const [fileList, setFileList] = useState<UploadFile<Blob> | any>();
    const [previewImage, setPreviewImage] = useState('');
    const [explainError, setExplainError] = useState(false);
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

    /*Use Effect change fileName and change value Description*/
    useEffect(() => {
        if (attachmentDetail?.attachment && !fileList?.name) {
            setAttachmentData({
                fileName: String(attachmentDetail?.attachment?.fileName),
                valueDescription: String(attachmentDetail?.attachment?.attachmentDescription),
            });
            setExplainError(false);
        }
        if (fileList?.name) {
            setAttachmentData({
                fileName: String(fileList?.name),
                valueDescription: String(fileList?.name),
            });
            setExplainError(false);
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
        setAttachmentData({ fileName: '', valueDescription: '' });
        setPreviewImage('');
        dispatch(resetValueAttachmentDetail());
    };

    /* handle Update and Add Attachment */
    const handleSubmitAttachment = async () => {
        if (!idAttachment && !fileList) {
            setExplainError(true);
            return;
        }
        const formData = new FormData();
        formData.append('AttachmentId', idAttachment ? String(attachmentDetail?.attachment?.attachmentId) : '0');
        formData.append('EntityId', idAttachment ? String(attachmentDetail?.attachment?.entityId) : String(releaseId));
        formData.append('Description', attachmentData?.valueDescription);
        formData.append('EntityType', idAttachment ? String(attachmentDetail?.attachment?.entityType) : '2');
        formData.append('FileType', String(attachmentData?.fileName?.split('.').pop()));
        if (fileList) {
            formData.append('FileObject', fileList);
        }
        const url = `${API_PATHS.API}/Attachment/create-update-attachment`;
        const data = await axiosData(url, 'POST', formData);
        if (data) {
            dispatch(
                getRelaseAttachments({
                    entityId: Number(idAttachment ? attachmentDetail?.attachment?.entityId : releaseId),
                    entityTypes: 2,
                }),
            );
            const message = idAttachment ? 'Update attachment successfully' : 'Add attachment successfully';
            messageApi.success(message);
            handleCancelModal();
        }

        return data;
    };

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
                        id="ant-form_verify_create_update_attachment"
                    >
                        {fileList?.type?.startsWith('image/') && (
                            <Row className="attachment_preview_img">
                                <Image width={500} src={previewImage} />
                            </Row>
                        )}

                        {attachmentData.fileName && (
                            <Row className="attachment_preview_filename">
                                {attachmentDetail?.attachment && attachmentDetail?.attachment?.fileObjectUrl ? (
                                    <Tooltip title="View attachment">
                                        <a
                                            target="_blank"
                                            href={attachmentDetail?.attachment?.fileObjectUrl}
                                            className="attachment-modal__link-image"
                                        >
                                            <div className="attachment-modal__file-info relative">
                                                <span className="attachment-modal__filename">
                                                    {attachmentData.fileName}
                                                </span>
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
                                            <span className="attachment-modal__filename">
                                                {attachmentData.fileName}
                                            </span>
                                        </div>
                                    </a>
                                )}
                            </Row>
                        )}

                        <Row className="w-full form__upload_attachment relative">
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
                            {explainError && (
                                <span className="absolute top-full form__upload_title">No File chosen.</span>
                            )}
                        </Row>

                        <Row className="w-full mt-2 form__description">
                            <Input
                                name="description"
                                value={
                                    attachmentData.valueDescription?.split('.')[0] || attachmentData.valueDescription
                                }
                                onChange={(e) =>
                                    setAttachmentData({ ...attachmentData, valueDescription: e.target.value })
                                }
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
