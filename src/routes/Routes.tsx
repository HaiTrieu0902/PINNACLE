import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../configs/routes';
const LoginPage = lazy(() => import('../modules/page/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const DashBroadPage = lazy(() => import('../pages/dashbroad/DashBroadPage'));
export const RoutesConfig = () => {
    return (
        <>
            <Suspense fallback={<div>Loading.....</div>}>
                <Routes>
                    <Route path={ROUTES.login} Component={LoginPage} />
                    <Route path={ROUTES.login} Component={LoginPage} />
                    <Route path={ROUTES.home} Component={HomePage} />
                    <Route path={ROUTES.dashbroad} Component={DashBroadPage} />
                </Routes>
            </Suspense>
        </>
    );
};
