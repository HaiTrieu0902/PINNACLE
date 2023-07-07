import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
    const authToken = localStorage.getItem('accessToken');
    return !authToken ? <Outlet /> : <Navigate to={'/home'} replace />;
};

export default PrivateRoutes;
