import React from 'react'
import { Link } from 'react-router-dom'

const Regitser = () => {
  return (
    <>
      <h1 className='text-sky-600 text-2xl md:text-4xl  font-bold  capitalize'>
         create an account to manage your
        <span className='text-slate-700'>Proyects</span>
      </h1>
      <form action="" className='my-5 bg-white shadow rounded-lg p-5'>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="name">Name</label>
          <input type="text" id='name' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            placeholder='Pedro' />
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="email">Email</label>
          <input type="email" id='email' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            placeholder='Email' />
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="password">Password</label>
          <input type="password" id='password' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50' />
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="password2">Repeat Password</label>
          <input type="password" id='password2' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50' />
        </div>
        <input type="submit" value='create account'
          className='bg-sky-700 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold' />
      </form>
      <nav className='md:flex md:justify-between'>
        <Link className='text-sky-600' to='/login'>Do you have an account?</Link>
        <Link className='text-sky-600' to='/reset-password'>Forgot my password</Link>
      </nav>
    </>
  )
}

export default Regitser