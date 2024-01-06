import { AxiosError } from 'axios';
import{useState} from 'react'
import { Link } from 'react-router-dom'
import Alert, { AlertProps } from '../components/Alert';
import axiosInstance from '../axios/axios';
const ResetPassword = () => {

  const [email, setEmail] = useState<string>('');
  const [alert, setAlert] = useState<AlertProps>({
    message: '',
    error: false
  })
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '') {
      setAlert({
        message: 'Email is required',
        error: true
      })
      return
    }
    try {
      const {data} =await  axiosInstance.post(`/users/reset-password`, {email});
      console.log(data)
      setAlert({
        message: data.message,
        error: false
      })
      setEmail('')
    } catch (error : unknown) {
      if(error instanceof AxiosError){
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
        Send you email to reset your password

      </h1>
      {alert.message && <Alert error={alert.error} message={alert.message} />}
      <form
      onSubmit={handleSubmit} 
      action="" className='my-5 bg-white shadow rounded-lg p-5'>

        <div className='mt-5 '>
          <label className='uppercase' htmlFor="email">Email</label>
          <input type="email" id='email' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            placeholder='Email' 
            value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <input type="submit" value='Reset password'
          className='bg-sky-700 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold' />
      </form>
      <nav className='md:flex md:justify-between'>
        <Link className='text-sky-600' to='/login'>Do you have an account?</Link>
        <Link className='text-sky-600' to='/register'>Register</Link>
      </nav>
    </>
  )
}

export default ResetPassword