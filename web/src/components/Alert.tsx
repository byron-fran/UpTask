import { FC } from "react"



export interface AlertProps {

    message: string,
    error: boolean

}

const Alert: FC<AlertProps> = ({error, message }) => {
    return (
        <div className={`${error ? 'from-red-400 to-red-600' : ' from-sky-400 to-sky-600'}
    mt-4    
    bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm`}>
            {message}
        </div>
    )
}

export default Alert