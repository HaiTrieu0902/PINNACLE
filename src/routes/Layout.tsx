import Cookies from 'js-cookie';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { RoutesConfig } from './Routes';
import { useAppSelector } from '../store';
const Layout = () => {
    const { token } = useAppSelector((state) => state.auth);
    const valueToken = Cookies.get(ACCESS_TOKEN_KEY);
    // console.log('value token: ', valueToken);
    // console.log('token: ', token);
    return (
        <section className="">
            {valueToken && (
                <div>
                    <div style={{ zIndex: '101' }}>
                        <Header />
                    </div>
                    <div style={{ zIndex: '99' }}>
                        <Sidebar />
                    </div>
                </div>
            )}
            <div>
                <RoutesConfig></RoutesConfig>
            </div>
        </section>
    );
};

export default Layout;
