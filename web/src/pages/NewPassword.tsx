import { useEffect, useState } from 'react';
import Alert, { AlertProps } from '../components/Alert';
import { Link, useParams } from 'react-router-dom'
import  { AxiosError } from 'axios';
import axiosInstance from '../axios/axios';
const NewPassword = () => {

  const [alert, setAlert] = useState<AlertProps>({
    message: '',
    error: false
  });
  const [tokenValidate, setTokenValidate] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const { token } = useParams();


  useEffect(() => {
    const checkToken = async () => {
      try {
       await axiosInstance(`/users/verify/${token}`);
        setTokenValidate(true)
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setAlert({
            message: error.response?.data.message,
            error: true
          })
          return
        }
      }
    };
    checkToken()
  }, [])

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password.length < 6) {
      setAlert({
        message: 'The password must have at least 6 characters',
        error: true
      });
      return
    }
    setAlert({
      message: '',
      error: false
    });

    try {
      
      const {data} = await axiosInstance.post(`/users/new-password/${token}`, {password});
      setAlert({
        message: data.message,
        error: false
      })
      setPassword('');
      setConfirmPassword(true);
     
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        setAlert({
          message: error.response?.data.message,
          error: true
        })
        return
      }
    }
  }
  return (
    <>
      <h1 className='text-sky-600 text-2xl md:text-4xl  font-bold  capitalize'>
        Create your new password to manage your
        <span className='text-slate-700'>Proyects</span>
      </h1>
      {alert.message && <Alert error={alert.error} message={alert.message} />}
      {tokenValidate &&
        <>

          <form action="" className='my-5 bg-white shadow rounded-lg p-5'
            onSubmit={handleSubmitPassword}
          >

            <div className='mt-5 '>
              <label className='uppercase' htmlFor="password">Password</label>
              <input
                autoComplete='on'
                type="password" id='password' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit"
              placeholder='new password'
              className='bg-sky-700 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold'
              value={'Create new password'}
            />
          </form>
          <nav className='md:flex md:justify-between'>
       {confirmPassword && <Link className='text-sky-600' to='/login'>Login</Link>}

          </nav>
          </>}
    </>
  )
}

export default NewPassword