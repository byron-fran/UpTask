import mongoose from "mongoose";


export const db = async () =>{
    try{
        const conexion = await mongoose.connect('mongodb+srv://byron123:byron123@cluster0.xlmmosh.mongodb.net/uptask?retryWrites=true&w=majority', {
       
        })
        const url = `${conexion.connection.host}: ${conexion.connection.port}`;
        console.log(`conectado ${url}`)
    }
    catch(error : unknown){
        console.log(error)
        process.exit(1)
    }
}