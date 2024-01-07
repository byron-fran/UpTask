import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
        <p className='text-xl font-bold mb-4'>Hola</p>
        <Link className='bg-sky-600 text-white py-2 px-4 rounded-lg ' to='new-proyect'>New Pryect</Link>
    </aside>
  )
}

export default Sidebar