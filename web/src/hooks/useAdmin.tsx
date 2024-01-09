import useAuth from "./useAuth"
import useProyect from "./useProyect"

const useAdmin = () => {
    const { auth } = useAuth();
    const { proyectDetail } = useProyect();

    return {isAutor : auth?._id === proyectDetail?.creator}
}

export default useAdmin