import { Routes, Route } from 'react-router';
import Dashboard from '../pages/dashboard';
import Header from '../components/header';
import Navigation from '../components/navigation';
import User from '../pages/User';
import Report from '../pages/Report';
import Article from '../pages/Article';

const AppRoutes = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex flex-1">
                <Navigation />

                <div className="flex-1 overflow-auto p-6 bg-gray-50">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                    <Routes>
                        <Route path="/user" element={<User />} />
                    </Routes>
                    <Routes>
                        <Route path="/report" element={<Report />} />
                    </Routes>
                    <Routes>
                        <Route path="/article" element={<Article />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AppRoutes;
