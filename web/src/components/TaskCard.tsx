import { Task } from "../interfaces/Task"
import { formatDate } from "../helpers/formatDate"
import useProyect from "../hooks/useProyect"

interface TaskProps {
    task: Task
}
const TaskCard = ({ task }: TaskProps) => {

    const {updateTask, deletTaskById} = useProyect()

    const handleUodateTask = async (task : Task) => {
        await updateTask(task)
    };
    const handleDelete = async  (id : string) => {
        if(confirm('Do you want to delete this task?')){
           await deletTaskById(id)
            return
        }
    }
    return (
        <div className="shadow-md p-4 mt-4">
            <p>{task.name}</p>
            <p>{task.description}</p>
            <p>{task.priority}</p>
            <p>{formatDate(task.deadline!)}</p>
            <div className="flex gap-2  flex-1  mt-2 ">
                {task.status ? (
                    <button className="p-2 flex-1 rounded-md text-white bg-sky-600">complete</button>

                ) : (<button className="p-2  rounded-md text-white bg-blue-600">incomplete</button>)}
                <button className="p-2 flex-1 rounded-md text-white bg-lime-600"
                    onClick={() => handleUodateTask(task)}> edit</button>
                <button className="p-2 flex-1 rounded-md text-white bg-red-600"
                    onClick={() => handleDelete(task._id!)}>delete</button>

            </div>
        </div>
    )
}

export default TaskCard