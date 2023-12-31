import { Fragment, useEffect, useState, } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyect from '../hooks/useProyect'
import { useParams } from 'react-router-dom'
import Alert from './Alert'

const Modal = () => {
    const { formModal, handleModalForm, setAlert, alert, submitTask, task, setTask, proyectDetail, updateTaskById } = useProyect();
    const [taskId, setTaskId] = useState<string>()
    const priorities: string[] = ['Low', 'Medium', 'High'];
    const { id } = useParams();


    useEffect(() => {
        if (task?._id) {
            setTaskId(task._id);
            return
        }

        setTaskId('');


    }, [task._id])
    //destructuring task
    const { description, name, priority, deadline } = task
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([name, description, deadline, priority].includes('')) {
            setAlert({
                message: 'All fields are required',
                error: true
            });
            setTimeout(() => {
                setAlert({
                    message: '',
                    error: false
                })
            }, 3000)
            return
        }
        // submit task
        const taskFound = proyectDetail?.tasks?.find((task) => task?._id === taskId);
        if (taskFound) {
            await updateTaskById(task)
            return
        }

        await submitTask({ name, description, priority, deadline, proyect: id! })

        // reset form
        setTask({
            _id: '',
            name: '',
            description: '',
            priority: '',
            deadline: '',
            proyect: '',
        })
    }

    return (
        <Transition.Root show={formModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalForm}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalForm}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        Title
                                    </Dialog.Title>
                                    <form className='my-10'
                                        onSubmit={handleSubmit}>
                                        {alert.message && <Alert error={alert.error} message={alert.message} />}
                                        <div className='mb-5'>

                                            <label htmlFor='name'>Name </label>
                                            <input type="text"
                                                id='name'
                                                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={name}
                                                placeholder='Name of the task'
                                                onChange={(e) => setTask({ ...task, name: e.target.value })}

                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor='deadline'>Deadline </label>
                                            <input type="date"
                                                id='deadline'
                                                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={deadline}

                                                onChange={(e) => setTask({ ...task, deadline: e.target.value })}

                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor='description'>Description </label>
                                            <textarea
                                                id='description'
                                                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={description}
                                                placeholder='Description of the task'
                                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor='priority'>Priority</label>
                                            <select
                                                id='priority'
                                                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={priority}
                                                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                                            >
                                                <option>--select priority--</option>
                                                {priorities.map((priority, i) => (
                                                    <option key={i}>{priority}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <input
                                            type='submit'
                                            value={`${taskId ? 'update' : 'create'}`}
                                            className='bg-sky-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-sky-700 cursor-pointer'
                                        />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default Modal