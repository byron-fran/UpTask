import { useState, Dispatch, SetStateAction, ReactNode, createContext, FC, useEffect } from 'react';
import { Proyect } from '../interfaces/Proyect';
import { Alert } from '../interfaces/Alert';
import axiosInstance from '../axios/axios';
import { AxiosError } from 'axios';
import {useNavigate,} from  'react-router-dom';

type ProyectsContextType = {
    proyect: Proyect,
    proyects: Proyect[],
    setProyects: Dispatch<SetStateAction<Proyect[]>>
    setProyect: Dispatch<SetStateAction<Proyect>>,
    showAlert : (alert : Alert) => void,
    alert : Alert,
    setAlert : Dispatch<SetStateAction<Alert>>
    createProyect: (proyect: Proyect) => Promise<void>,
    proyectDetail : Proyect,
    setProyectDetail : Dispatch<SetStateAction<Proyect>>,
    getProyectById: (id: string) => Promise<void>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
    deleteProyectById: (id: string) => Promise<void>
}

const ProyectsDefaultValue: ProyectsContextType = {
    proyect: {
        _id: '',
        name: '',
        description: '',
        client: '',
        creator: '', 
    },
    proyects: [],
    setProyects: () => { },
    setProyect: () => { },
    showAlert : () => {},
    alert : {
        message: '',
        error: false
    },
    setAlert : () => {},
    createProyect: async () => {},
    proyectDetail : {
        _id: '',
        name: '',
        description: '',
        client: '',
        creator: '',
    }
    ,
    setProyectDetail : () => {},
    getProyectById: async () => {},
    isLoading: false,
    setIsLoading: () => {},
    deleteProyectById: async () => {}
}

export const ProyectContext = createContext<ProyectsContextType>(ProyectsDefaultValue);


type ProyectsProviderProps = {
    children: ReactNode
}

const ProyectsProvider: FC<ProyectsProviderProps> = ({ children }) => {

    const [proyects, setProyects] = useState<Proyect[]>(ProyectsDefaultValue.proyects)
    const [proyect, setProyect] = useState<Proyect>(ProyectsDefaultValue.proyect);
    const [alert, setAlert] = useState<Alert>(ProyectsDefaultValue.alert);
    const [proyectDetail, setProyectDetail] = useState<Proyect>(ProyectsDefaultValue.proyectDetail);
    const [isLoading, setIsLoading] = useState<boolean>(ProyectsDefaultValue.isLoading)
    const navigate = useNavigate();

    useEffect(() => {
        const getProyects = async () => {
            const token= localStorage.getItem( 'token' );
            if(!token) {
                return
            }
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };
            try {
                const {data} = await axiosInstance('/proyects', config);
                setProyects(data);
            } catch (error : unknown) {
                if(error instanceof AxiosError) {
                    setAlert({
                        message: error.response?.data.message,
                        error: true
                    })
                }
            }
        };
        getProyects()
    }, [])
    const showAlert  = (alert : Alert) => {
        setAlert(alert)
    };

    // function to create a new project
    const createProyect = async (proyect: Proyect) => {
    
        if(proyect._id){
            await updateProyect(proyect)
        }
        else{
            await newProyect(proyect)
        }

    };

    const newProyect = async (proyect: Proyect) => {
        const token= localStorage.getItem( 'token' );
        if(!token) {
            return
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };
        try {
            const {data} = await axiosInstance.post('/proyects', proyect, config);
            setProyects([...proyects, data]);
            setTimeout(() => {
                setAlert({
                    message: '',
                    error: false
                })
                navigate('/proyects')
            }, 2000)

        } catch (error : unknown) {
            if(error instanceof AxiosError) {
                setAlert({
                    message: error.response?.data.message,
                    error: true
                })
            }
        }
    };

    const updateProyect = async (proyect: Proyect) => {
        const token= localStorage.getItem( 'token' );
        if(!token) {
            return
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };
        try {
            const {data} = await axiosInstance.put(`/proyects/${proyect._id}`, proyect, config);
            const proyectsUpdate = proyects.map(proyect => proyect._id === data._id ? data : proyect);
            setProyects(proyectsUpdate);
            setTimeout(() => {
                setAlert({
                    message: 'Updated successfully',
                    error: false
                })
                navigate('/proyects')
            }, 2000)

        } catch (error : unknown) {
            if(error instanceof AxiosError) {
                setAlert({
                    message: error.response?.data.message,
                    error: true
                })
            }
        }
    }
    // function to get a proyect by id

    const getProyectById  = async(id : string )  => {
        setIsLoading(true)
        const token = localStorage.getItem('token');
        if(!token) {
            return
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };
        try {
            const {data} = await axiosInstance(`/proyects/${id}`, config);
         
            setProyectDetail(data);
        } catch (error : unknown) {
            if(error instanceof AxiosError) {
               
                setAlert({
                    message: error.response?.data.message,
                    error: true
                })
            }
        }
        finally {
            setIsLoading(false)
        }
    }
    const deleteProyectById  = async(id : string )  => {
        const token = localStorage.getItem('token');
        if(!token){
            return
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        try {
            const {data} = await axiosInstance.delete(`/proyects/${id}`, config);
            const proyectsUpdate = proyects.filter(proyect => proyect._id !== id);
            setProyects(proyectsUpdate);
            setAlert({
                message: data.message,
                error: false
            })
            navigate('/proyects')
        } catch (error : unknown) {
            if(error instanceof AxiosError) {
                setAlert({
                    message: error.response?.data.message,
                    error: true
                })
            }
            
        }
    }
    return (
        <ProyectContext.Provider value={{
            proyects,
            setProyects,
            proyect,
            setProyect,
            showAlert,
            alert,
            setAlert,
            createProyect,
            proyectDetail,
            setProyectDetail,
            getProyectById,
            isLoading,
            setIsLoading,
            deleteProyectById


        }}>
            {children}
        </ProyectContext.Provider>
    )
}

export default ProyectsProvider