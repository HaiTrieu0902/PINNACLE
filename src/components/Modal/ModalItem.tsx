import { Button, Divider, Modal, Row } from 'antd';
import SearchInput from '../Search/SearchInput';
import './ModalItem.scss';
import { useEffect, useState } from 'react';
import { UserSelects } from '../../types/auth';

interface ModalItemProps {
    isActive?: boolean;
    title?: string;
    subTitle?: string;
    onCancel: (value: boolean) => void;
    data?: UserSelects[];
}

const ModalItem = ({ isActive, data, onCancel, title, subTitle }: ModalItemProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        if (isActive !== undefined) {
            setOpenModal(isActive);
        }
    }, [isActive]);

    const handleCancelModal = () => {
        setOpenModal(false);
        onCancel(false);
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
                    <h3 className="release-modal__header text-center mb-4">{title}</h3>
                    <SearchInput
                        height="44px"
                        width="100%"
                        onSearch={() => {
                            return;
                        }}
                    />
                    <p className="mb-3 mt-3 sub-title-common">{subTitle}</p>

                    <div className="list-select-user">
                        {data?.map((item) => {
                            return (
                                <div key={item.userId}>
                                    <div className="mb-2 select-user">
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
