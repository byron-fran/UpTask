import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert';
import axiosInstance from '../axios/axios';
import { AxiosError } from 'axios';
import useAuth from '../hooks/useAuth';
const Login = () => {
  const [alert, setAlert] = useState({
    message: '',
    error: false
  })
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading} = useAuth();
  console.log(isLoading)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        message: 'All fields are required',
        error: true
      })
      return
    }
    try {
      const { data } = await axiosInstance.post('/users/login', { email, password });

      setAlert({
        message: '',
        error: false
      })
      localStorage.setItem('token', data.token);
      console.log(data)
      return data

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setAlert({
          message: error.response?.data.message,
          error: true
        })
      }
    }
  }
  return (
    <>
      <h1 className='text-sky-600 text-2xl md:text-4xl  font-bold  capitalize'>
        Login and manage your
        <span className='text-slate-700'>Proyects</span>
      </h1>

      <form action="" className='my-5 bg-white shadow rounded-lg p-5'
        onSubmit={handleSubmit}>
        {alert.message && <Alert error={alert.error} message={alert.message} />}
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="email">Email</label>
          <input type="email" id='email' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            placeholder='Email'
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="password">Password</label>
          <input type="password" id='password' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" value='Login'
          className='bg-sky-700 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold' />
      </form>
      <nav className='md:flex md:justify-between'>
        <Link className='text-sky-600' to='/register'>Register</Link>
        <Link className='text-sky-600' to='/reset-password'>Forgot my password</Link>
      </nav>
    </>
  )
}

export default Login