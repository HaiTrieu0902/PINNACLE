import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../configs/routes';
import NoAuthRoute from './NoAuthRoute';
import PrivateRoutes from './PrivateRoute';
const LoginPage = lazy(() => import('../modules/page/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const DashBroadPage = lazy(() => import('../pages/dashbroad/DashBroadPage'));

const RelasePage = lazy(() => import('../pages/release/ReleasePage'));
export const RoutesConfig = () => {
    return (
        <>
            <Suspense fallback={<div>Loading.....</div>}>
                <Routes>
                    <Route element={<NoAuthRoute />}>
                        <Route path={ROUTES.home} Component={HomePage} />
                        <Route path={ROUTES.dashbroad} Component={DashBroadPage} />
                        <Route path={ROUTES.release} Component={RelasePage} />
                    </Route>

                    <Route element={<PrivateRoutes />}>
                        <Route path={ROUTES.login} Component={LoginPage} />
                    </Route>
                    <Route path={ROUTES.mainpage} Component={LoginPage} />
                </Routes>
            </Suspense>
        </>
    );
};
