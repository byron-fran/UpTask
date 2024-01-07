import { useContext } from "react"
import { ProyectContext } from "../context/ProyectsProvider"

const useProyect = () => {
  return useContext(ProyectContext)
}

export default useProyect