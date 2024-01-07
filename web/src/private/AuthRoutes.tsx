import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
const AuthRoutes = () => {
    const {auth, isLoading} = useAuth();

    if(isLoading) return 'Loading...';
 
  return (
    <>
     
        {auth._id ?  <div>
            <Header/>
            <div className='md:flex md:min-h-screen bg-gray-100'>
                <Sidebar/>
                <main className='flex-1 bg-sky-50'>
                    <Outlet/>
                </main>
            </div>
        </div>: <Navigate to='/'/>}
       
    </>
  )
}

export default AuthRoutes