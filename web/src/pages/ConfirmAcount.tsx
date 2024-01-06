import { useEffect, useState } from "react"
import { useParams, Link, } from "react-router-dom"
import Alert, { AlertProps } from "../components/Alert"
import  { AxiosError } from "axios";
import axiosInstance from "../axios/axios";
const ConfirmAcount = () => {
  const [alert, setAlert] = useState<AlertProps>({
    message: '',
    error: false
  });
  const [ConfirmAcount, setConfirmAcount] = useState<boolean>(false);
  const { token } = useParams()

  useEffect(() => {
    const confirmAccount = async () => {


        try {
          const { data } = await axiosInstance(`/users/confirm/${token}`);
          setAlert({
            message: data.message,
            error: false
          });
          setConfirmAcount(true)
        } catch (error: unknown) {
          setConfirmAcount(false)
          if (error instanceof AxiosError) {
            setAlert({
              message: error.response?.data.message,
              error: true
            })
            return
          }
      }

    }
    confirmAccount()
  }, []);


  return (
    <>
      <h1 className='text-sky-600 text-2xl md:text-4xl  font-bold  capitalize'>
        Confirm your account to manage your
        <span className='text-slate-700'>Proyects</span>
        {alert.message && <Alert error={alert.error} message={alert.message} />}
        {ConfirmAcount && <Link className='text-sky-600 mt-4' to='/login'>Login</Link>}
      </h1>

    </>
  )
}

export default ConfirmAcount