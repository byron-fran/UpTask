import {useState, ReactNode, createContext, SetStateAction, Dispatch, useEffect} from 'react';
import { User } from '../interfaces/User';
import { AxiosError } from 'axios';
import axiosInstance from '../axios/axios';

type AuthContextType = {
    isAuthenticated: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    auth : User,
    setAuth : Dispatch<SetStateAction<User>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const AuthDefaultValue  : AuthContextType= {
    isAuthenticated : false,
    setIsAuthenticated: () => {},
    auth: {
        _id: '',
        name: '',
        email: '',
        password: '',
        token: ''
    },
    setAuth: () => {},
    isLoading: true,
    setIsLoading: () => {}
}


const AuthContext = createContext<AuthContextType>(AuthDefaultValue);


export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthDefaultValue.isAuthenticated)
    const [auth, setAuth] = useState<User>(AuthDefaultValue.auth);
    const [isLoading, setIsLoading] = useState<boolean>(AuthDefaultValue.isLoading);
    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setIsLoading(false)
                return
            }
            // TODO: check token validity
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };
            try {
                const {data} = await axiosInstance('/users/profile', config);
                setAuth(data)
            } catch (error : unknown) {
                if(error instanceof AxiosError) {
                    return
                }
            }
            finally {
                setIsLoading(false)
            }
        };
        authUser()
    }, [])

    return (
        (
        <AuthContext.Provider value={{  
            isAuthenticated,
            setIsAuthenticated,
            auth,
            setAuth,
            isLoading,
            setIsLoading

            }}>
            {children}
        </AuthContext.Provider>)
    )
};

export default AuthContext