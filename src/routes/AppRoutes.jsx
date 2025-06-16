import { Routes, Route } from 'react-router';
import Dashboard from '../pages/dashboard';
import Header from '../components/header';
import Navigation from '../components/navigation';

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
                </div>
            </div>
        </div>
    );
};

export default AppRoutes;
