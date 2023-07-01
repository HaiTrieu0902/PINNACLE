import { message } from 'antd';
import React from 'react';
import './App.css';
import Layout from './routes/Layout';
export const MessageContext = React.createContext({});
function App() {
    const [api, contextHolder] = message.useMessage();
    return (
        <>
            <MessageContext.Provider value={api}>
                {contextHolder}
                <Layout />
            </MessageContext.Provider>
        </>
    );
}

export default App;
