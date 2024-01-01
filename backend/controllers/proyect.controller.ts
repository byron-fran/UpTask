import {request, response,Request } from 'express';
import { AxiosError } from 'axios';
import { Proyect as ProyectInterface } from '../interface/Proyect';
import { AuthRequest } from '../middlewares/checkAuth';
import Proyect from '../models/Proyects';

const getProyectsByUser = async (req = request, res = response) =>{

    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
};

const createProyect = async (req : AuthRequest, res = response) =>{
    const {description, name, deadline, client} : ProyectInterface = req.body;


    try{
        const newProyect = await Proyect.create({
            name,
            description,
            deadline,
            client,
            creator : req.user._id
        })
        if(!newProyect){
            return res.status(400).json({message : 'Error creating proyect'})
        }
        await newProyect.save()
        return res.status(200).json(newProyect)
        
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

const getProyectById = async (req = request, res = response) =>{
    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
};

const updateProyect = async (req = request, res = response) =>{
    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
}

const deleteProyect = async (req = request, res = response) =>{
    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
};

const addColaborator = async (req = request, res = response) =>{
    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
};

const deleteColaborator = async (req = request, res = response) =>{
    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
};

const addTask = async (req = request, res = response) =>{
    try{
        
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
}
export {
    getProyectsByUser,
    createProyect,
    getProyectById,
    updateProyect,
    deleteProyect,
    addColaborator,
    deleteColaborator,
    addTask
}