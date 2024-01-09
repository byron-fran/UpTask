import React, { useEffect, useState } from 'react'
import Alert from './Alert';
import useProyect from '../hooks/useProyect';
import { useParams } from 'react-router-dom';

const FormColaborator = () => {
    const [email, setEmail] = useState<string>('');
    const { alert, setAlert, searchColaborator, colaborator, isLoading,addColaborator, getProyectById } = useProyect();
    const {id} = useParams();

    useEffect(() => {
       if(id){
        getProyectById(id)
        return
       }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([email].includes('')) {
            setAlert({
                message: 'Email is required',
                error: true
            })
            return
        }
        await searchColaborator(email);
    };
    const handleAddColaborator = async (email: string) => {
       await addColaborator(email)
        setEmail('');
    };

    return (
        <>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10 md:w-[80%] lg:w-1/2 mx-auto'
                onSubmit={handleSubmit}>
                {alert.message && <Alert error={alert.error} message={alert.message} />}
                <div className='mt-4'>
                    <label htmlFor="name">Email</label>
                    <input type='email' id='name'
                        placeholder='email of the colaborator'
                        className='border-2 w-full p-2 mt-2 rounded-lg'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <input type='submit'
                    value='Search Colaborator'
                    className="bg-sky-600 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold" />
            </form>
            <div className={`${colaborator?.name ? 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10 md:w-[80%] lg:w-1/2 mx-auto' : 'hidden'}`}>
                {
                    isLoading ? <h1 className='text-center '>Loading...</h1> : (
                        colaborator?.name &&
                   (     <div className='flex justify-between'>
                            <p className='font-bold '>{colaborator?.name}</p>
                            <button className=' bg-sky-600 hover:bg-sky-800 text-white p-2 rounded-md'
                                onClick={() => handleAddColaborator(colaborator?.email)}>Add colaborator</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default FormColaborator