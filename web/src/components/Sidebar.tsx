
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const {auth} = useAuth();

  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
        <p className='text-xl font-bold mb-4'>Hello, {auth?.name}</p>
        <Link className='bg-sky-600  text-white py-2 px-4 rounded-lg w-full block ' to='new-proyect'>New Proyect</Link>
    </aside>
  )
}

export default Sidebar