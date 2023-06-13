import React, { useState } from 'react';
import { Button, Form, Image, Input, Modal } from 'antd';
import logoV1 from '../../assets/logoV1.svg';
import logoV2 from '../../assets/logoV2.svg';
import { ParamLogin } from '../../types/auth';
import './LoginForm.scss';

export interface LoginFormProps {
    onLogin(values: ParamLogin): void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
    const [open, setOpen] = useState(false);

    const onFinish = (values: ParamLogin) => {
        onLogin(values);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const buttonItemLayout = {
        wrapperCol: { span: 24 },
    };

    return (
        <div className="bg-white  login-form-content rounded-[32px]">
            <div className="flex items-center flex-col p-4">
                <div className="w-full col_imgHeader">
                    <Image className="img_header" preview={false} width={130} src={logoV1} />
                </div>
                <div className="flex flex-col w-[67%] items-center">
                    <h1 className="text-title">Welcome</h1>
                    <span className="text-sm text-[#00000073] mb-8 text-center -mt-1">
                        Please enter your contact details to connect.
                    </span>
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        className="ant-form-container w-full"
                        id="ant-form_login"
                    >
                        <Form.Item
                            name="account"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter account information',
                                },
                            ]}
                            className="label-input"
                        >
                            <Input id="login_account" placeholder="Enter your username" className="ant-input_login " />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter account information',
                                },
                            ]}
                            className="label-input"
                        >
                            <Input
                                id="login_password"
                                type="password"
                                placeholder="Enter your password"
                                className="ant-input_login "
                            />
                        </Form.Item>

                        <div className="flex justify-between">
                            <div></div>
                            <Button onClick={showModal} type="link">
                                <span className="text-base font-normal text-[#000000d9] underline">Fogot password</span>
                            </Button>
                        </div>

                        <Form.Item {...buttonItemLayout}>
                            <Button
                                className="bg-[#002060] w-full mt-6 rounded-xl h-[51px] text-lg font-semibold text-white text-family button-ant_login"
                                type="primary"
                                htmlType="submit"
                            >
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <div className="w-full card_footer">
                    <Image className="img_header" preview={false} width={80} src={logoV2} />
                </div>

                <span className="text-[#3c5896] text-base">
                    © Copyright PinnacleQM 2014 - {new Date().getFullYear()}. All Rights Reserved
                </span>
                <Modal open={open} onCancel={handleCancel} closable={false} footer={null}>
                    <div className="flex flex-col text-center">
                        <h2 className="text-title">Forgot your password?</h2>
                        <span className="text-sm text-[#00000073] mt-0 mb-8">
                            Enter your registered information to receive password reset instruction
                        </span>
                        <Form
                            onFinish={onFinish}
                            layout="vertical"
                            className="ant-form-container w-full"
                            id="ant-form_verify"
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter account information!',
                                    },
                                ]}
                                className="label-input"
                            >
                                <Input
                                    id="login_account"
                                    placeholder="Enter your email/username"
                                    className="ant-input_vetify"
                                />
                            </Form.Item>
                            <Form.Item {...buttonItemLayout}>
                                <Button
                                    className="bg-[#002060] w-full mt-3 rounded-xl h-[51px] text-lg font-semibold text-white text-family button-ant_login"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Verify
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};
export default LoginForm;
