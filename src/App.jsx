
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router'

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App