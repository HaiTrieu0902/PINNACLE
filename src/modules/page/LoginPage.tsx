import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../../App';
import { API_PATHS } from '../../configs/api';
import { ROUTES } from '../../configs/routes';
import { getAccessToken, getUserAuth } from '../../redux/authToken';
import { useAppDispatch } from '../../store';
import { ParamLogin } from '../../types/auth';
import { ACCESS_TOKEN_KEY } from '../../utils/constant';
import LoginForm from '../auth/LoginForm';
const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const messageApi: any = useContext(MessageContext);
    const onLogin = async (value: ParamLogin) => {
        try {
            const res = await axios.post(`${API_PATHS.API}/${API_PATHS.signIn}`, {
                account: value.account,
                password: value.password,
            });

            if (res.status === 200) {
                Cookies.set(ACCESS_TOKEN_KEY, res.data.token);
                localStorage.setItem('accessToken', res.data.token);
                dispatch(getAccessToken(res.data.token));
                dispatch(getUserAuth(res.data.user));
                navigate(ROUTES.home);
            }
            messageApi.success('Login SuccessFullly');
        } catch (error) {
            messageApi.error('Your UserID and Password combination do not match. Please retry again.');
        }
    };

    return (
        <div style={{ height: '100vh' }} className="flex mx-auto items-center justify-center bg-[#fafafa]">
            <LoginForm onLogin={onLogin} />
            {/* {contextHolder} */}
        </div>
    );
};

export default LoginPage;
