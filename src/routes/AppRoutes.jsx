import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import Dashboard from '../pages/dashboard';
import Header from '../components/header';
import Navigation from '../components/navigation';
import User from '../pages/User';
import Report from '../pages/Report';
import ReportDetail from '../pages/ReportDetail';
import Article from '../pages/Article';
import Login from '../pages/login';
import NotFound from '../pages/NotFound';

const Layout = ({ children }) => (
    <div className="relative w-screen h-screen overflow-hidden">
        {/* Header tetap di atas */}
        <div className="absolute top-0 left-0 right-0 h-16 z-50">
            <Header />
        </div>

        {/* Sidebar tetap di kiri, di bawah header */}
        <div className="absolute top-16 left-0 bottom-0 w-64 z-40">
            <Navigation />
        </div>

        {/* Konten yang bisa discroll */}
        <div className="absolute top-16 left-24 right-0 bottom-0 overflow-auto z-30">
            {children}
        </div>
    </div>
);

const AppRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        if (!token && location.pathname !== '/login') {
            navigate('/login');
        }

        if (token && location.pathname === '/login') {
            navigate('/');
        }
    }, [location, navigate]);

    return (
        <Routes>
            {/* No Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />

            {/* With Layout */}
            <Route
                path="/"
                element={
                    <Layout>
                        <Dashboard />
                    </Layout>
                }
            />
            <Route
                path="/user"
                element={
                    <Layout>
                        <User />
                    </Layout>
                }
            />
            <Route
                path="/report"
                element={
                    <Layout>
                        <Report />
                    </Layout>
                }
            />
            <Route
                path="/reports/:id"
                element={
                    <Layout>
                        <ReportDetail />
                    </Layout>
                }
            />
            <Route
                path="/article"
                element={
                    <Layout>
                        <Article />
                    </Layout>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
