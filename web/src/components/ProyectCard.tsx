import { useEffect, } from "react"
import { useParams, Link } from "react-router-dom"
import useProyect from "../hooks/useProyect";
import Modal from "./Modal";
import TaskCard from "./TaskCard";
import { User } from "../interfaces/User";
import useAdmin from "../hooks/useAdmin";
const ProyectCard = () => {

    const { id } = useParams();
    const { getProyectById, proyectDetail, isLoading, deleteProyectById, handleModalForm, deleteColaborator } = useProyect();
    const { isAutor } = useAdmin();
    useEffect(() => {
        getProyectById(id!)
    }, [id])

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this proyect?')) {
            await deleteProyectById(id);

            return
        }

    };

    const handleDeleteColaborator = (cololaborator: User) => {
        if (confirm('Are you sure you want to delete this colaborator?')) {
            deleteColaborator(cololaborator.email)
            return
        }

    }
    return (
        <>
            {
                isLoading ? 'Loading...' :
                    (
                        <div className="md:w-[90%] mx-auto">
                            <div className="mt-4 flex  shadow-md p-4 rounded-md">
                                <h1 className="font-bold text-2xl flex-1">{proyectDetail?.name}</h1>
                                {isAutor && (
                                    <div className="flex flex-col">
                                        <Link
                                            className="text-sky-600"
                                            to={`/proyects/update-proyect/${proyectDetail?._id}`}>Update</Link>
                                        <button
                                            className="text-red-600"
                                            onClick={() => handleDelete(proyectDetail?._id)}>Delete</button>
                                    </div>

                                )}

                            </div>
                            {
                                isAutor && (
                                    <div className="md:inline-flex p-2 rounded-md mt-4 bg-sky-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <button
                                            className="text-white"
                                            onClick={handleModalForm}
                                        >New Task</button>
                                    </div>
                                )
                            }


                            <Modal />
                            <h2>{proyectDetail?.tasks?.length ? (
                                proyectDetail?.tasks?.map((task) => (
                                    <TaskCard key={task?._id} task={task} />
                                ))
                            ) : 'No tasks'}</h2>
                            {
                                isAutor && (

                                    <div className="mt-4 flex flex-col">


                                        <div className="flex justify-between">
                                            {proyectDetail?.colaborators?.length ? (
                                                <p className="font-bold ">Colaborators</p>
                                            ) : (<h1 className="font-bold">No colaborators</h1>)}

                                            <div className="md:inline-flex p-2 rounded-md mt-4 bg-sky-600 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <Link
                                                    className=" text-white rounded-md"
                                                    to={`/proyects/add-colaborator/${proyectDetail?._id}`}>Add colaborator</Link>
                                            </div>

                                        </div>
                                        {proyectDetail?.colaborators?.length ? (
                                            <div className="block mt-10 mb-4">
                                                {proyectDetail?.colaborators?.map((colaborator) => (
                                                    <div key={colaborator?._id} className="flex justify-between shadow-md p-4">
                                                        <div>
                                                            <p className="font-bold text-gray-600">{colaborator?.name}</p>
                                                            <p className="text-sky-600">{colaborator?.email}</p>
                                                        </div>

                                                        <button className="bg-red-600 hover:bg-red-800 text-white p-2 rounded-md mt-2"
                                                            onClick={() => handleDeleteColaborator(colaborator)}>Delete colaborator</button>
                                                    </div>
                                                ))}
                                            </div>


                                        ) : null}

                                    </div>
                                )
                            }

                        </div>

                    )
            }
        </>
    )
}

export default ProyectCard