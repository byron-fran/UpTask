import {useState, ReactNode, createContext, SetStateAction, Dispatch} from 'react';
import { User } from '../interfaces/User';


type AuthContextType = {
    isAuthenticated: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const AuthDefaultValue  : AuthContextType= {
    isAuthenticated : false,
    setIsAuthenticated: () => {}	
}


const AuthContext = createContext<AuthContextType>(AuthDefaultValue);


export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthDefaultValue.isAuthenticated)

    return (
        (
        <AuthContext.Provider value={{  
            isAuthenticated,
            setIsAuthenticated
            }}>
            {children}
        </AuthContext.Provider>)
    )
};

export default AuthContext