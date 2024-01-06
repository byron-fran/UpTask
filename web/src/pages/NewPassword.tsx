import React from 'react'
import { Link } from 'react-router-dom'

const NewPassword = () => {
  return (
    <>
      <h1 className='text-sky-600 text-2xl md:text-4xl  font-bold  capitalize'>
       Create your new password to manage your
        <span className='text-slate-700'>Proyects</span>
      </h1>
      <form action="" className='my-5 bg-white shadow rounded-lg p-5'>
    
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="password">Password</label>
          <input type="password" id='password' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50' />
        </div>
        <input type="submit"  value='Create new password'
        className='bg-sky-700 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold'/>
      </form>
      <nav className='md:flex md:justify-between'>
      <Link className='text-sky-600' to='/register'>Register</Link>
      <Link className='text-sky-600' to='/login'>Do you have an account?</Link>
      </nav>
    </>
  )
}

export default NewPassword