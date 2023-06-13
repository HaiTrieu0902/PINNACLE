import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const LoginPage = lazy(() => import('./modules/page/LoginPage'));
function App() {
    return (
        <>
            <Suspense fallback={<div>Loading.....</div>}>
                <Routes>
                    <Route path="/" Component={LoginPage} />
                    {/* <Route path={ROUTES.login} Component={LoginPage} /> */}
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
