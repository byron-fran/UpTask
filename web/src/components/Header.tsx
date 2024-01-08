import React from 'react'
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <header className='px-4 bg-white border-b p-4 '>
        <div className='md:flex md:justify-between items-center '>
            <h2 className='text-4xl text-sky-600 text-center font-black'>Uptask</h2>
            <input
                type='search'
                placeholder='search projects'
                className='border-b rounded-md w-96 bg-sky-50 p-2 focus:outline-sky-600' 
            />
            <div className='flex items-center md:gap-4'>
                <Link  to='/proyects' className='font-bold'>Proyects</Link>
                <Link 
                className='bg-sky-600 text-white py-2 px-4 rounded-lg'
                to=''>Log out</Link>
            </div>
        </div>

    </header>
  )
}

export default Header