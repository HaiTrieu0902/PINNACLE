import { Button, Divider, Modal, Row } from 'antd';
import SearchInput from '../Search/SearchInput';
import './ModalItem.scss';
import { useContext, useEffect, useState } from 'react';
import { UserSelects } from '../../types/auth';
import { MessageContext } from '../../App';
import { API_PATHS } from '../../configs/api';
import { axiosData } from '../../configs/axiosApiCusomer';
import { getReleaseDetail } from '../../redux/release.slice';
import { useAppDispatch } from './../../store';

interface ModalItemProps {
    isActive?: boolean;
    title?: string;
    subTitle?: string;
    onCancel: (value: boolean) => void;
    data?: UserSelects[];
    releaseId?: number | null;
}

const ModalItem = ({ isActive, data, onCancel, title, subTitle, releaseId }: ModalItemProps) => {
    const dispatch = useAppDispatch();
    const [filteredData, setFilteredData] = useState<UserSelects[]>(data ?? []);
    const messageApi: any = useContext(MessageContext);
    const [openModal, setOpenModal] = useState<boolean>(false);

    // Set state to open modal
    useEffect(() => {
        if (isActive !== undefined) {
            setOpenModal(isActive);
        }
    }, [isActive]);

    // handle close modal
    const handleCancelModal = () => {
        setOpenModal(false);
        onCancel(false);
    };

    // handle search user
    const handleOnSearchUSer = (value: string) => {
        const filteredUsers = data?.filter((item) => item?.userName.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filteredUsers || []);
    };

    // handle selected userId
    const handleSelectedUserId = async (value: number) => {
        const param = {
            entityId: releaseId,
            userId: value,
        };
        const url = `${API_PATHS.API}/Releases/release-workflow-${title}`;
        const data = await axiosData(url, 'POST', param);
        dispatch(getReleaseDetail(Number(releaseId)));
        setOpenModal(false);
        onCancel(false);
        messageApi.success(`${data}`);
        return data;
    };

    return (
        <div>
            <Modal
                width={'520px'}
                open={openModal}
                onCancel={handleCancelModal}
                footer={null}
                className="release-workflow_modal"
            >
                <div className="flex flex-col">
                    <h3 className="release-modal__header text-center mb-4 capitalize">{title}</h3>
                    <SearchInput height="44px" width="100%" onSearch={handleOnSearchUSer} />
                    <p className="mb-3 mt-3 sub-title-common">{subTitle}</p>

                    <div className="list-select-user">
                        {filteredData?.map((item) => {
                            return (
                                <div key={item.userId}>
                                    <div
                                        onDoubleClick={() => handleSelectedUserId(item.userId)}
                                        className="mb-2 select-user"
                                    >
                                        <img src="http://pinnacle-portal.server2div3.pgtest.co/icons/user.svg" alt="" />
                                        <span className="mb-1 select-title">{item?.userName}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Row justify={'end'} className="w-full">
                        <Divider type="horizontal" className="!mt-6 " />
                        <Button onClick={handleCancelModal} className="h-10 w-20 -mt-3">
                            Cancel
                        </Button>
                    </Row>
                </div>
            </Modal>
        </div>
    );
};

export default ModalItem;
