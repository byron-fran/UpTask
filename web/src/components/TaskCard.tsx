import { Task } from "../interfaces/Task"
import { formatDate } from "../helpers/formatDate"
import useProyect from "../hooks/useProyect"
import useAdmin from "../hooks/useAdmin"
interface TaskProps {
    task: Task
}
const TaskCard = ({ task }: TaskProps) => {

    const { updateTask, deletTaskById , changeStatusById} = useProyect()
    const { isAutor } = useAdmin()
    const handleUodateTask = async (task: Task) => {
        await updateTask(task)
    };
    const handleDelete = async (id: string) => {
        if (confirm('Do you want to delete this task?')) {
            await deletTaskById(id)
            return
        }
    };
    
    const handleUpdateStatus = async (id : string) => {
        changeStatusById(id)
    }
    return (
        <div className="shadow-md p-4 mt-4">
            <p>{task.name}</p>
            <p>{task.description}</p>
            <p>{task.priority}</p>
            <p>{formatDate(task.deadline!)}</p>
            <div className="flex gap-2  flex-1  mt-2 ">

                <button className={`p-2  rounded-md text-white ${task.status ? 'bg-sky-600' : 'bg-slate-600'}`}
                onClick={() => handleUpdateStatus(task._id!)}>{task.status ? 'complete' : 'incomplete'} </button>
                {
                    isAutor && (
                        <>
                            <button className="p-2  rounded-md text-white bg-lime-600"
                                onClick={() => handleUodateTask(task)}>Update</button>
                            <button className="p-2  rounded-md text-white bg-red-600"
                                onClick={() => handleDelete(task._id!)}>delete</button>
                        </>
                    )
                }


            </div>
        </div>
    )
}

export default TaskCard