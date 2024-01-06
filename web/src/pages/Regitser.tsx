import {useState} from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import { AlertProps } from '../components/Alert'
import axios, { AxiosError } from 'axios'

const Regitser = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [alert, setAlert] = useState<AlertProps>({
    message: '',
    error: false
  })  

  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if([name, email, password, confirmPassword].includes('')) {
      setAlert({
        message: 'All fields are required',
        error: true
      });
      return
    }
    if(password !== confirmPassword) {
      setAlert({
        message: 'The password does not match',
        error: true
      });
      return
    }
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
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/create`, {name, email, password});
      setAlert({
        message: data.message,
        error: false
      })

      //clear form
      setEmail ('')
      setName('')
      setPassword('')
      setConfirmPassword('')
      return data
    } catch (error : unknown) {
      if(error instanceof AxiosError) {
        setAlert({
          message: error.response?.data.message,
          error: true
        });
        return
      }
      console.log(error);
    }
  }

  return (
    <>
      <h1 className='text-sky-600 text-2xl md:text-4xl  font-bold  capitalize'>
         create an account to manage your
        <span className='text-slate-700'>Proyects</span>
      </h1>
      {alert.message && <Alert error={alert.error} message={alert.message} />}
      <form action="" className='mx-5 bg-white shadow rounded-lg p-5'
        onSubmit={handleSubmit}>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="name">Name</label>
          <input type="text" id='name' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder='Pedro' />
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="email">Email</label>
          <input type="email" id='email' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            placeholder='Email'
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="password">Password</label>
          <input 
           autoComplete='on'
          type="password" id='password' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50'
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='mt-5 '>
          <label className='uppercase' htmlFor="password2">Repeat Password</label>
          <input 
            autoComplete='on'
            type="password" id='password2' className='border-2 w-full p-2 mt-2 rounded-lg bg-sky-50' 
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
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