import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const LoginPage = lazy(() => import('../modules/page/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
export const RoutesConfig = () => {
    return (
        <>
            <Suspense fallback={<div>Loading.....</div>}>
                <Routes>
                    <Route path="/" Component={LoginPage} />
                    <Route path="/login" Component={LoginPage} />
                    <Route path="/home" Component={HomePage} />
                    {/* <Route path={ROUTES.login} Component={LoginPage} /> */}
                </Routes>
            </Suspense>
        </>
    );
};
