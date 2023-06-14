import { useAppSelector } from '../store';
import { ACCESS_TOKEN_KEY } from '../utils/constant';
import Cookies from 'js-cookie';
const HomePage = () => {
    const valueToken = Cookies.get(ACCESS_TOKEN_KEY);
    const { token } = useAppSelector((state) => state.auth);
    return (
        <div className="fixer-pt">
            <p>homepage</p>
        </div>
    );
};
export default HomePage;
