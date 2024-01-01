import { AxiosError } from "axios";
import { AuthRequest } from "../middlewares/checkAuth";
import Task from "../models/Task";
import { Request, Response } from "express";
import Proyect from '../models/Proyects'

const createTask = async (req : AuthRequest, res : Response) =>{
    const {proyect } = req.body;
    const {_id} = req.user

    try{
        const proyectExists = await Proyect.findById(proyect);
        if(!proyectExists){
            return res.status(400).json({message : 'Proyect not found'})
        }
        console.log(proyectExists.creator)
        console.log(_id)
        if(proyectExists.creator.toString() !== _id.toString()){
            return res.status(401).json({message : 'You are not the creator of this proyect'})
        }

        const newTask = await Task.create(req.body);
        if(!newTask){
            return res.status(400).json({message : 'Error creating task'})
        }
        await newTask.save()
        return res.status(200).json(newTask)
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : error})
        }
    }
};

const getTasks = async (req : AuthRequest, res : Response) =>{
    const {id} = req.params;
    const {_id} = req.user
    try{
        // get task by id
        const task = await Task.findById(id).populate('proyect');
        const proyect = await Proyect.findById(task?.proyect);

        if(!task){
            return res.status(404).json({message : 'Task not found'})
        };
        if(proyect?.creator.toString() !== _id.toString()){
            return res.status(403).json({message : 'You are not the creator of this proyect'})
        }

        return res.status(200).json(task)

        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : error})
        }
    }
};

const deleteTask = async (req : AuthRequest, res : Response) =>{
    const {id} = req.params;
    const {_id} = req.user
    try{
        const task = await Task.findById(id);
        const proyect = await Proyect.findById(task?.proyect);
        if(!task){
            return res.status(404).json({message : 'Task not found'})
        }
        if(proyect?.creator.toString() !== _id.toString()){
            return res.status(403).json({message : 'You are not the creator of this proyect'})
        }

        await Task.findByIdAndDelete(id)
        return res.status(200).json({message : 'Task deleted'})
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : error})
        }
    }
};

const updateTask = async (req : AuthRequest, res : Response) =>{
    const {id} = req.params;
    const {_id} = req.user
    try{
        const task = await Task.findById(id);
        const proyect = await Proyect.findById(task?.proyect);
        if(!task){
            return res.status(404).json({message : 'Task not found'})
        }
        if(proyect?.creator.toString() !== _id.toString()){
            return res.status(403).json({message : 'You are not the creator of this proyect'})
        }
        const taskUpdate = await Task.findByIdAndUpdate(id, req.body, {new : true});
        await taskUpdate?.save()
        return res.status(200).json(taskUpdate)
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : error})
        }
    }
};


const changeStatus = async (req : AuthRequest, res : Response) =>{

    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : error})
        }
    }
};

export {
    createTask,
    getTasks,
    deleteTask,
    updateTask,
    changeStatus
}