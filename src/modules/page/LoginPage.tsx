import React from 'react';
import { Button, Form, Image, Input, message } from 'antd';
import LoginForm from '../auth/LoginForm';
import { ParamLogin } from '../../types/auth';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/constant';
const LoginPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const onLogin = async (value: ParamLogin) => {
        try {
            const res = await axios.post(`${API_PATHS.API_FIXER}/${API_PATHS.signIn}`, {
                account: value.account,
                password: value.password,
            });
            messageApi.open({
                type: 'success',
                content: 'Login successful',
                className: 'custom-class',
                style: {
                    marginTop: '2vh',
                },
            });
            Cookies.set(ACCESS_TOKEN_KEY, res.data.token);
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
