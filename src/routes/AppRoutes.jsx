import { Routes, Route } from 'react-router'
import Dashboard from '../pages/dashboard'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={
                    <>
                        <Dashboard />
                    </>
                }
                />
            </Routes>
        </div>
    )
}

export default AppRoutes