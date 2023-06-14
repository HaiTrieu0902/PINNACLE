import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_PATHS } from '../../configs/api';
import { ParamLogin } from '../../types/auth';
import { ACCESS_TOKEN_KEY } from '../../utils/constant';
import LoginForm from '../auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { getAccessToken } from '../../redux/authToken';
import { ROUTES } from '../../configs/routes';
const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onLogin = async (value: ParamLogin) => {
        try {
            const res = await axios.post(`${API_PATHS.API}/${API_PATHS.signIn}`, {
                account: value.account,
                password: value.password,
            });

            if (res.status === 200) {
                Cookies.set(ACCESS_TOKEN_KEY, res.data.token);
                dispatch(getAccessToken(res.data.token));
                navigate(ROUTES.home);
            }
            messageApi.open({
                type: 'success',
                content: 'Login successful',
                className: 'custom-class',
                style: {
                    marginTop: '2vh',
                },
            });
        } catch (error) {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Your UserID and Password combination do not match. Please retry again.',
                className: 'custom-class',
                style: {
                    marginTop: '2vh',
                },
            });
        }
    };

    return (
        <div style={{ height: '100vh' }} className="flex mx-auto items-center justify-center bg-[#fafafa]">
            <LoginForm onLogin={onLogin} />
            {contextHolder}
        </div>
    );
};

export default LoginPage;
