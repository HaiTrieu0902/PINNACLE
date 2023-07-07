import { Navigate, Outlet } from 'react-router-dom';
const NoAuthRoute = () => {
    const authToken = localStorage.getItem('accessToken');
    return authToken ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default NoAuthRoute;
