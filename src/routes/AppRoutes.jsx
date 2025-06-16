import { Routes, Route, useLocation } from 'react-router';
import Dashboard from '../pages/dashboard';
import Header from '../components/header';
import Navigation from '../components/navigation';
import User from '../pages/User';
import Report from '../pages/Report';
import Article from '../pages/Article';
import Login from '../pages/login';

const AppRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className="flex flex-col h-screen">
            {!isLoginPage && <Header />}
            <div className="flex flex-1">
                {!isLoginPage && <Navigation />}

                <div className="flex-1 overflow-auto p-6 bg-gray-50">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/report" element={<Report />} />
                        <Route path="/article" element={<Article />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AppRoutes;
