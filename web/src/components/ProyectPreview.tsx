import { Proyect } from "../interfaces/Proyect"
import { Link } from "react-router-dom"
interface PryectProps {
    proyect: Proyect
}
const ProyectPreview = ({proyect}: PryectProps) => {
  return (
    <div className="flex px-4 border border-gray-200 mt-1 p-2">
        <p className="flex-1 text-gray-600">{proyect?.name}</p>
        <Link to={`${proyect?._id}`} className="text-gray-600 hover:text-gray-900">View <span>Proyect</span></Link>
    </div>
  )
}

export default ProyectPreview