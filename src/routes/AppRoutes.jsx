import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Header from '../components/header';
import Navigation from '../components/navigation';
import User from '../pages/User';
import Report from '../pages/Report';
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
