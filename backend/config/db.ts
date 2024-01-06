import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const db = async () =>{
    try{
        const conexion = await mongoose.connect(process.env.MONGO_URI!, {
       
        })
        const url = `${conexion.connection.host}: ${conexion.connection.port}`;
        console.log(`conectado ${url}`)
    }
    catch(error : unknown){
        console.log(error)
        process.exit(1)
    }
}