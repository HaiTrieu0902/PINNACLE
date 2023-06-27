import { Button, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoV1 from '../../assets/logoV1.svg';
import { ROUTES } from '../../configs/routes';
import './Header.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../redux/authToken';
const Header = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const logOut = () => {
        dispatch(logout());
        navigate(ROUTES.login);
    };
    return (
        <header className="container-layout-header">
            <div className="ant-row header">
                <div className="header_logo">
                    <Link to={ROUTES.home}>
                        <Image preview={false} src={logoV1} width={200} alt="Logo"></Image>
                    </Link>
                </div>
                <div className="header_control">
                    <Button className="header__logout__button" onClick={logOut}>
                        <span>Logout</span>
                    </Button>
                    <div className="title-sign-in">{user.fullname}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
