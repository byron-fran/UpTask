import { request, response, Request } from 'express';
import { AxiosError } from 'axios';
import { Proyect as ProyectInterface } from '../interface/Proyect';
import { AuthRequest } from '../middlewares/checkAuth';
import Proyect from '../models/Proyects';
import Task from '../models/Task';

const getProyectsByUser = async (req: AuthRequest, res = response) => {
    const { _id } = req.user;

    try {
        const proyects = await Proyect.find().where('creator').equals(_id)
        if (!proyects) {
            return res.status(400).json({ message: 'Error getting proyects' })
        }
        return res.status(200).json(proyects)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }
};

const createProyect = async (req: AuthRequest, res = response) => {
    const { description, name, deadline, client }: ProyectInterface = req.body;

    try {
        const newProyect = await Proyect.create({
            name,
            description,
            deadline,
            client,
            creator: req.user._id
        })
        if (!newProyect) {
            return res.status(400).json({ message: 'Error creating proyect' })
        }
        await newProyect.save()
        return res.status(200).json(newProyect)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }
};

const getProyectById = async (req: AuthRequest, res = response) => {
    const { id } = req.params;
    const { _id } = req.user;

    try {
        const proyect = await Proyect.findById(id).populate('tasks', '-__v', Task, { proyect: id })

    
        if (!proyect) {
            return res.status(404).json({ message: 'proyect not found' })
        }
        if (proyect.creator.toString() !== _id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const tasks = await Task.find().where('proyect').equals(proyect._id);


        return res.status(200).json(proyect)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }
};

const updateProyect = async (req: AuthRequest, res = response) => {
    const { id } = req.params;
    const { _id } = req.user
    try {
        const proyect = await Proyect.findById(id);
        if (!proyect) {
            return res.status(404).json({ message: 'proyect not found' })
        }
        if (proyect.creator.toString() !== _id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const updatedProyect = await Proyect.findByIdAndUpdate(id, req.body, { new: true })
        await updatedProyect?.save()
        return res.status(200).json(updatedProyect)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
}

const deleteProyect = async (req: AuthRequest, res = response) => {
    const { id } = req.params;
    try {
        const proyect = await Proyect.findById(id);
        if (!proyect) {
            return res.status(404).json({ message: 'proyect not found' })
        }
        if (proyect.creator.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        await Proyect.findByIdAndDelete(id)
        return res.status(200).json({ message: 'proyect deleted' })

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
};

const addColaborator = async (req = request, res = response) => {
    try {


    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
};

const deleteColaborator = async (req = request, res = response) => {
    try {


    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
};


export {
    getProyectsByUser,
    createProyect,
    getProyectById,
    updateProyect,
    deleteProyect,
    addColaborator,
    deleteColaborator,

}