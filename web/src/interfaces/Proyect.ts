import { User } from "./User";
export interface Proyect {
    _id : string,
    name : string,
    description : string,
    deadline? : Date,
    client : string,
    creator : string,
    colaborators? : User[]
}