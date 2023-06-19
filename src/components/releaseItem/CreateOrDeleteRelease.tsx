import { Image } from 'antd';
import addIcon from '../../assets/icon/addIcon.svg';
import deleteIcon from '../../assets/icon/deleteIcon.svg';
import addIconActive from '../../assets/icon/addIconActive.svg';
import deleteActive from '../../assets/icon/deleteIconActive.svg';
import { useState } from 'react';
type IconType = typeof addIcon | typeof deleteIcon;
const CreateOrDeleteRelease = () => {
    const [hoveredIcon, setHoveredIcon] = useState<IconType | null>(null);
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
        </div>
    );
};

export default CreateOrDeleteRelease;
