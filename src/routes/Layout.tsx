import Cookies from 'js-cookie';
import Header from '../components/Header/Header';
import ContainerPage from '../pages/Container/ContainerPage';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import { RoutesConfig } from './Routes';
import Sidebar from '../components/Sidebar/Sidebar';
const Layout = () => {
    const valueToken = Cookies.get(ACCESS_TOKEN_KEY);
    console.log('value token: ', valueToken);
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
