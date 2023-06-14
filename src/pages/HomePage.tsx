import { useAppSelector } from '../store';
const HomePage = () => {
    const { token } = useAppSelector((state) => state.auth);

    return (
        <div>
            <p>homepage</p>
            <p>{token}</p>
        </div>
    );
};
export default HomePage;
