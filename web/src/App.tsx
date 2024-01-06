import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Regitser from "./pages/Regitser";
import NewPassword from "./pages/NewPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmAcount from "./pages/ConfirmAcount";
import AuthLayout from "./layout/AuthLayout";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path='/register' element={<Regitser/>}/>
          <Route path='/new-password/:token' element={<NewPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/confirm-account/:token' element={<ConfirmAcount/>}/>
          <Route path='*' element={<Login/>}/>
        </Route>
      </Routes>

    </>
  )
}

export default App
