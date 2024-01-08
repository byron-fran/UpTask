import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyect from "../hooks/useProyect"
import Alert from "./Alert";
const FormProyect = () => {

    const { setProyect, proyect, showAlert, createProyect, alert, proyectDetail, getProyectById } = useProyect();
    const [idProyect, setIdProyect] = useState<string>('')
    const {id} = useParams()
    useEffect(() => {
        if(id) {
            getProyectById(id)
            setIdProyect(id)
            setProyect({
                client: proyectDetail?.client,
                name: proyectDetail?.name,
                description: proyectDetail?.description,
                deadline : proyectDetail?.deadline?.split('T')[0],
                _id: proyectDetail?._id
            });
            return
        }
    }, [id, setProyect])

    const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([proyect.client, proyect.name, proyect.description,].includes('')) {
            showAlert({
                message: 'All fields are required',
                error: true
            })
  
            return
        }
  
        await createProyect({...proyect, _id : idProyect})
        setProyect({
            client: '',
            name: '',
            description: '',
            deadline : '',
            _id: '',
        });
        
        showAlert({
            message: 'Proyect created successfully',
            error: false
        })
    }   
    return (
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10 md:1/2'
            onSubmit={handleSubmit}>
                {alert.message && <Alert error={alert.error} message={alert.message} />}
            <div>
                <label htmlFor="name">Proyect Name</label>
                <input type='text' id='name'
                    placeholder='name of your proyect'
                    className='border-2 w-full p-2 mt-2 rounded-lg'
                    value={proyect.name}
                    onChange={(e) => setProyect({ ...proyect, name: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="description">Description </label>
                <textarea id='description'
                    placeholder='description of your proyect'
                    className='border-2 w-full p-2 mt-2 rounded-lg resize-none'
                    value={proyect.description}
                    onChange={(e) => setProyect({ ...proyect, description: e.target.value })} />
            </div>
            <div>
                <label htmlFor="deadline">Deadline</label>
                <input type='date' id='deadline'
                    className='border-2 w-full p-2 mt-2 rounded-lg'
                    value={proyect.deadline?.toString()}
                    onChange={(e) => setProyect({ ...proyect, deadline: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="client">Client</label>
                <input type='text' id='client'
                    placeholder='Client'
                    className='border-2 w-full p-2 mt-2 rounded-lg'
                    value={proyect.client}
                    onChange={(e) => setProyect({ ...proyect, client: e.target.value })} />
            </div>
            <input type='submit'
                value={`${idProyect ? 'Update' : 'Create'}`}
                className="bg-sky-600 hover:cursor-pointer hover:bg-sky-800  w-full mt-6 p-3 rounded-md text-white uppercase font-bold" />
        </form>
    )
}

export default FormProyect