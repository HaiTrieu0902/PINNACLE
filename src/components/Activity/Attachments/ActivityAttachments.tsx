/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Tooltip, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import './ActivityAttachments.scss';
import IconEyes from '../../../assets/eyes.svg';
import IconTrash from '../../../assets/trash.svg';
import { useAppDispatch, useAppSelector } from '../../../store';
import { MessageContext } from '../../../App';
import { useContext, useEffect, useState } from 'react';
import { getRelaseAttachments } from '../../../redux/activity.slice';

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

    /* Effect call API */
    useEffect(() => {
        if (Number(releaseId) > 0) {
            const relaseAttachment = dispatch(getRelaseAttachments({ entityId: Number(releaseId), entityTypes: 2 }));
            return () => {
                relaseAttachment.abort();
            };
        }
    }, [dispatch, releaseId]);

    /* Effect config TABLE (View , Remove) */
    useEffect(() => {
        if (releaseAttachmentsList?.attachments?.length > 0) {
            const tempData = releaseAttachmentsList?.attachments.map((item) => ({
                key: item?.attachmentId,
                attachmentDescription: item?.attachmentDescription,
                attachedByName: item?.attachedByName,
                attachedOn: item?.attachedOn,
                view: (
                    <Space key={item?.attachmentId} onClick={() => alert(item.attachmentId)}>
                        <img className="w-4" src={IconEyes} alt="" />
                    </Space>
                ),
                remove: (
                    <Space key={item?.attachmentId} onClick={() => alert(item.attachmentId)}>
                        <img className="w-4" src={IconTrash} alt="" />
                    </Space>
                ),
            }));
            setDataAttachment(tempData);
        } else {
            setDataAttachment([]);
        }
    }, [releaseAttachmentsList?.attachments]);

    return (
        <div className="attachment">
            <div className="attachment__header">
                <Button className="button-items w-24">
                    <span className="text-sm font-medium">Add New</span>
                </Button>
            </div>
            <div className="attachment-table-wrapper">
                <Table
                    className="attachment-table"
                    pagination={false}
                    columns={columns}
                    dataSource={dataAttachment || []}
                    showSorterTooltip={true}
                />
            </div>
        </div>
    );
};

export default ActivityAttachments;
