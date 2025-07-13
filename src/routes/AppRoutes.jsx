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
    <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
            <Navigation />
            <div className="flex-1 overflow-auto p-6 bg-gray-50">{children}</div>
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
