import { User } from "./User";
export interface Proyect {
    _id : string,
    name : string,
    description : string,
    deadline? : string ,
    client : string,
    creator? : string,
    colaborators? : User[]
}