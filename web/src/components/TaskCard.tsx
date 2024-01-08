import { Task } from "../interfaces/Task"
import { formatDate } from "../helpers/formatDate"

interface TaskProps {
    task: Task
}
const TaskCard = ({ task }: TaskProps) => {
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
                <button className="p-2 flex-1 rounded-md text-white bg-lime-600"> edit</button>
                <button className="p-2 flex-1 rounded-md text-white bg-red-600">delete</button>

            </div>
        </div>
    )
}

export default TaskCard