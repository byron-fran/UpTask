import { User } from "./User";
import { Task } from "./Task";
export interface Proyect {
    _id : string,
    name : string,
    description : string,
    deadline? : string ,
    client : string,
    creator? : string,
    colaborators? : User[],
    tasks? : Task[]
}