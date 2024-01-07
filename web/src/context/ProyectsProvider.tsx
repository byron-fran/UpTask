import { useState, Dispatch, SetStateAction, ReactNode, createContext, FC } from 'react';
import { Proyect } from '../interfaces/Proyect';


type ProyectsContextType = {
    proyect: Proyect,
    proyects: Proyect[],
    setProyects: Dispatch<SetStateAction<Proyect[]>>
    setProyect: Dispatch<SetStateAction<Proyect>>
}

const ProyectsDefaultValue: ProyectsContextType = {
    proyect: {
        _id: '',
        name: '',
        description: '',
        client: '',
        creator: ''
    },
    proyects: [],
    setProyects: () => { },
    setProyect: () => { }
}

export const ProyectContext = createContext<ProyectsContextType>(ProyectsDefaultValue);


type ProyectsProviderProps = {
    children: ReactNode
}

const ProyectsProvider: FC<ProyectsProviderProps> = ({ children }) => {

    const [proyects, setProyects] = useState<Proyect[]>(ProyectsDefaultValue.proyects)
    const [proyect, setProyect] = useState<Proyect>(ProyectsDefaultValue.proyect);

    return (
        <ProyectContext.Provider value={{
            proyects,
            setProyects,
            proyect,
            setProyect
        }}>
            {children}
        </ProyectContext.Provider>
    )
}

export default ProyectsProvider