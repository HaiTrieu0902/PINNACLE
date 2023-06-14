import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { links } from '../../context/dataMenu';
import './Sidebar.scss';
const Sidebar = () => {
    const { pathname } = useLocation();
    const [isACitve, setisACitve] = useState('');
    useEffect(() => {
        setisACitve(pathname.substring(1));
    }, [setisACitve, pathname]);

    return (
        <div className="fixer-pt sidebar-layout fixed">
            <div className="fixer-pt">
                {links.map((item, index) => (
                    <div key={index} className="mt-6 ">
                        <h4 className="text-menu-link text-sm font-semibold mb-2 ml-3">{item.title}</h4>
                        {item.links.map((link, index) => (
                            <NavLink
                                key={index}
                                to={`/${link.nameLink}`}
                                onClick={() => {
                                    setisACitve(link.nameLink);
                                }}
                            >
                                <div
                                    className={`flex items-center gap-3 nomal-link ${
                                        link.nameLink === isACitve && 'active-link'
                                    } `}
                                >
                                    <Image
                                        src={link.nameLink === isACitve ? link.iconActive : link.icon}
                                        preview={false}
                                        width={20}
                                        className="ml"
                                        alt=""
                                    />
                                    <p className="font-normal text-[13px] ml">{link.name}</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
