import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Regitser from "./pages/Regitser";
import NewPassword from "./pages/NewPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmAcount from "./pages/ConfirmAcount";
import AuthLayout from "./layout/AuthLayout";
import { AuthProvider } from './context/AuthContext';
import Proyects from './pages/Proyects';
import AuthRoutes from './private/AuthRoutes';
import NewProyect from './pages/NewProyect';
import ProyectsProvider from './context/ProyectsProvider';
import ProyectCard from './components/ProyectCard';
import UpdateProyect from './pages/UpdateProyect';

function App() {

  return (
    <>
    <AuthProvider>
      <ProyectsProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='/register' element={<Regitser />} />
            <Route path='/new-password/:token' element={<NewPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/confirm-account/:token' element={<ConfirmAcount />} />
            <Route path='*' element={<Login />} />
          </Route>
          {/* auth routes */}
          <Route path='/proyects' element={<AuthRoutes />}>
            <Route index element={<Proyects />} />
            <Route path='new-proyect' element={<NewProyect />} />
            <Route path=':id' element={<ProyectCard />} />
            <Route path='update-proyect/:id' element={<UpdateProyect />} />
            <Route path='update-proyect/*' element={<Proyects />} />
          </Route>
        </Routes>
      </ProyectsProvider>
    </AuthProvider>


    </>
  )
}

export default App
