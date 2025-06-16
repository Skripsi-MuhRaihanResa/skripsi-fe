import { Routes, Route } from 'react-router'
import Dashboard from '../pages/dashboard'
import Header from '../components/header'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={
                    <>
                        <Header />
                        <Dashboard />
                    </>
                }
                />
            </Routes>
        </div>
    )
}

export default AppRoutes