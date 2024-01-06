import React from 'react'
import{Link} from 'react-router-dom'


const Login = () => {
  return (
    <>
      <h1 className='text-sky-600 text-2xl md:text-4xl  font-bold  capitalize'>
   Login and manage your
        <span className='text-slate-700'>Proyects</span>
      </h1>
      <form action="" className='my-5 bg-white shadow rounded-lg p-5'>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="email">Email</label>
          <input type="email" id='email' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50' 
            placeholder='Email'/>
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="password">Password</label>
          <input type="password" id='password' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50' />
        </div>
        <input type="submit"  value='Login'
        className='bg-sky-700 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold'/>
      </form>
      <nav className='md:flex md:justify-between'>
      <Link className='text-sky-600' to='/register'>Register</Link>
      <Link className='text-sky-600' to='/reset-password'>Forgot my password</Link>
      </nav>
    </>
  )
}

export default Login