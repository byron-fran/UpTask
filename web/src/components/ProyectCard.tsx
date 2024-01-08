import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyect from "../hooks/useProyect";

const ProyectCard = () => {

    const { id } = useParams();
    const { getProyectById, proyectDetail, isLoading , deleteProyectById} = useProyect();

    useEffect(() => {
        getProyectById(id!)
    }, [id])

    const handleDelete = async (id : string) => {
        if(confirm('Are you sure you want to delete this proyect?')) {
            await deleteProyectById(id);
           return
        }

    }
    return (
        <>
            {
                isLoading ? 'Loading...' :
                    (
                        <div className="mt-4 flex md:w-[90%] mx-auto shadow-md p-4 rounded-md">
                            <h1 className="font-bold text-2xl flex-1">{proyectDetail?.name}</h1>
                            <div className="flex flex-col">
                                <Link 
                                    className="text-sky-600"
                                     to={`/proyects/update-proyect/${proyectDetail?._id}`}>Update</Link>
                                <button 
                                    className="text-red-600"
                                    onClick={() => handleDelete(proyectDetail?._id)}>Delete</button>
                            </div>

                        </div>
                    )
            }
        </>
    )
}

export default ProyectCard