/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Popover, Row, Space, Tooltip, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import './ActivityAttachments.scss';
import IconEyes from '../../../assets/eyes.svg';
import IconTrash from '../../../assets/trash.svg';
import { useAppDispatch, useAppSelector } from '../../../store';
import { MessageContext } from '../../../App';
import { useContext, useEffect, useState } from 'react';
import { getRelaseAttachments } from '../../../redux/activity.slice';
import ModalAttachment from '../../Modal/Attachment/ModalAttachment';
import { ExclamationCircleFilled } from '@ant-design/icons';
/* interface DataType */
interface DataType {
    key: number | string;
    attachmentDescription: string;
    attachedByName: string;
    attachedOn: Date | string;
    view: string | React.ReactNode;
    remove: string | React.ReactNode;
}
/* handle render Text tooltip in table */
const renderTextWithTooltip = (text: string) => (
    <Tooltip title={text}>
        <Typography.Text ellipsis>{text}</Typography.Text>
    </Tooltip>
);
const columns: ColumnsType<DataType> = [
    {
        title: 'Description',
        dataIndex: 'attachmentDescription',
        sorter: {
            compare: (a, b) => a.attachmentDescription.localeCompare(b.attachmentDescription),
        },
        width: 150,
        render: renderTextWithTooltip,
        ellipsis: true,
        className: 'attachment-columns',
    },
    {
        title: 'Attached By',
        dataIndex: 'attachedByName',
        sorter: {
            compare: (a, b) => a.attachedByName.localeCompare(b.attachedByName),
        },
        render: renderTextWithTooltip,
        width: 130,
        ellipsis: true,
        className: 'attachment-columns',
    },
    {
        title: 'Attached On',
        dataIndex: 'attachedOn',
        sorter: {
            // compare: (a, b) => a.attachedOn.localeCompare(b.attachedOn),
        },
        render: renderTextWithTooltip,
        width: 130,
        ellipsis: true,
        className: 'attachment-columns',
    },
    {
        title: 'View',
        dataIndex: 'view',
        width: 70,
        ellipsis: true,
        className: 'attachment-columns',
    },
    {
        title: 'Remove',
        dataIndex: 'remove',
        width: 70,
        ellipsis: true,
        className: 'attachment-columns',
    },
];

const ActivityAttachments = () => {
    const dispatch = useAppDispatch();
    const messageApi: any = useContext(MessageContext);
    const { releaseAttachmentsList } = useAppSelector((state) => state.activity);
    const { releaseId } = useAppSelector((state) => state.release);
    const [dataAttachment, setDataAttachment] = useState<DataType[]>([]);
    const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
    const [idAttachment, setIdAttachment] = useState<number | undefined>();
    const [showPopover, setShowPopover] = useState<Array<boolean>>([]);

    /* Effect call API */
    useEffect(() => {
        if (Number(releaseId) > 0) {
            const relaseAttachment = dispatch(getRelaseAttachments({ entityId: Number(releaseId), entityTypes: 2 }));
            return () => {
                relaseAttachment.abort();
            };
        }
    }, [dispatch, releaseId]);

    // /* handle hide Popover */
    const hidePopover = (index: number) => {
        setShowPopover((prevState) => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
        });
    };

    /* handle show Popover */
    const handleOpenChangePopover = (newOpen: boolean, index: number) => {
        setShowPopover((prevState) => {
            const newState = [...prevState];
            newState[index] = newOpen;
            return newState;
        });
    };

    /* handle config TABLE (View , Remove) */
    const handleConvertDataAttachment = (): DataType[] | any => {
        if (releaseAttachmentsList?.attachments?.length > 0) {
            return releaseAttachmentsList?.attachments?.map((item, index) => ({
                key: item?.attachmentId,
                attachmentDescription: item?.attachmentDescription,
                attachedByName: item?.attachedByName,
                attachedOn: item?.attachedOn,
                view: (
                    <Space key={item?.attachmentId} onClick={() => onActiveModal(item?.attachmentId)}>
                        <img className="w-4" src={IconEyes} alt="" />
                    </Space>
                ),
                remove: (
                    <>
                        <Popover
                            open={showPopover[index]}
                            onOpenChange={(newOpen) => handleOpenChangePopover(newOpen, index)}
                            placement="topRight"
                            title={
                                <Row className="mt-2">
                                    <ExclamationCircleFilled style={{ fontSize: '16px', color: '#faad14' }} />
                                    <span className="!text-[#000000d9] !text-sm">
                                        Are you sure to delete this attachment ?
                                    </span>
                                </Row>
                            }
                            content={
                                <Row justify={'end'} className="w-full mt-6 footer__form-attachment">
                                    <div className="flex gap-1 -mt-3">
                                        <Button onClick={() => hidePopover(index)} className="h-10 w-14 mr-2">
                                            No
                                        </Button>
                                        <Button className={`button-items h-10 w-14`}>
                                            <span className="text-sm font-medium">Yes</span>
                                        </Button>
                                    </div>
                                </Row>
                            }
                            trigger="click"
                        >
                            <Button key={item?.attachmentId} className="button__popover">
                                <img className="w-4" src={IconTrash} alt="" />
                            </Button>
                        </Popover>
                    </>
                ),
            }));
        }
    };

    /* handle active Modal Attachemnt */
    const onActiveModal = (idAttachment?: number) => {
        setIsActiveModal(true);
        setIdAttachment(idAttachment);
    };

    /* handle cancel Modal Attachment*/
    const onCancelModal = () => {
        setIsActiveModal(false);
        setIdAttachment(undefined);
    };

    return (
        <div className="attachment">
            <div className="attachment__header">
                <Button onClick={() => onActiveModal()} className="button-items w-24">
                    <span className="text-sm font-medium">Add New</span>
                </Button>
            </div>
            <div className="attachment-table-wrapper">
                <Table
                    className="attachment-table"
                    pagination={false}
                    columns={columns}
                    dataSource={handleConvertDataAttachment() || []}
                    showSorterTooltip={true}
                />
            </div>
            <div className="attachment-modal__create__update">
                {/* Modal Add Or Update attachment */}
                <ModalAttachment
                    isActive={isActiveModal}
                    onCancel={onCancelModal}
                    title={idAttachment ? 'Update Attachment' : 'Add Attachment'}
                    type={idAttachment ? 'update' : 'add'}
                    host="release"
                    idAttachment={idAttachment}
                />
            </div>

            <div>
                <Popover
                    placement="topRight"
                    title={
                        <Row className="mt-2">
                            <ExclamationCircleFilled style={{ fontSize: '16px', color: '#faad14' }} />
                            <span className="!text-[#000000d9] !text-sm">Are you sure to delete this attachment ?</span>
                        </Row>
                    }
                    content={
                        <Row justify={'end'} className="w-full mt-6 footer__form-attachment">
                            <div className="flex gap-1 -mt-3">
                                <Button className="h-10 w-14 mr-2">No</Button>
                                <Button className={`button-items h-10 w-14`}>
                                    <span className="text-sm font-medium">Yes</span>
                                </Button>
                            </div>
                        </Row>
                    }
                    trigger="click"
                ></Popover>
            </div>
        </div>
    );
};

export default ActivityAttachments;
