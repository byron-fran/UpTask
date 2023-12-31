import { request, response, Request } from 'express';
import { AxiosError } from 'axios';
import { Proyect as ProyectInterface } from '../interface/Proyect';
import { AuthRequest } from '../middlewares/checkAuth';
import Proyect from '../models/Proyects';
import Task from '../models/Task';
import User from '../models/User'

const getProyectsByUser = async (req: AuthRequest, res = response) => {
    const { _id } = req.user;

    try {
        const proyects = await Proyect.find({
            $or :[
                {creator : _id},
                {colaborators : _id}
            ]
        })
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
        const proyect = await Proyect.findById(id)
            .populate('tasks', '-__v', Task, { proyect: id })
            .populate('colaborators', '-__v -password -token -confirm', User);


        if (!proyect) {
            return res.status(404).json({ message: 'proyect not found' })
        }
        
        // Check if user is creator or collaborator
        if (proyect.creator.toString() !== _id.toString() && 
        !proyect.colaborators.some((colaborator: any) => colaborator._id.toString() === _id.toString())) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
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
const searchColaborator = async (req = request, res = response) => {
    const { email } = req.body;
    try {
        const colaboratorExists = await User.findOne({ email }).select('-password -token -confirm -__v');
        if (!colaboratorExists) {
            return res.status(404).json({ message: 'Email not found' })
        }
        return res.status(200).json(colaboratorExists)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }
}

const addColaborator = async (req : AuthRequest, res = response) => {
    const { id } = req.params;
    const { email  } = req.body;

    try {
        const proyectFound = await Proyect.findById(id);
        if (!proyectFound) {
            return res.status(404).json({ message: 'proyect not found' })
        };
        if(proyectFound.creator.toString() !== req.user._id.toString()){
            return res.status(403).json({message : 'You are not the creator of this proyect'})
        };
        const colaboratorExists = await User.findOne({ email }).select('-password -token -confirm -__v');
        if (!colaboratorExists) {
            return res.status(404).json({ message: 'Email not found' })
        };

        // Check if user is the collaborator
        if (colaboratorExists._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot add yourself as a collaborator' })
        } 

        // check if colaborator already exists in the proyect
        if(proyectFound.colaborators?.some(colaborator => colaborator._id.toString() === colaboratorExists._id.toString())){
            return res.status(400).json({ message: 'Colaborator already exists in the proyect' })
        }

        // Add colaborator to the proyect
        proyectFound.colaborators?.push(colaboratorExists.id)
        await proyectFound.save();
        return res.status(200).json({message: 'Colaborator added to the proyect'})


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

const deleteColaborator = async (req : AuthRequest, res = response) => {
    const { id } = req.params;
    const { email  } = req.body;
    try {

        const proyectFound = await Proyect.findById(id);
        if (!proyectFound) {
            return res.status(404).json({ message: 'proyect not found' })
        };
        if(proyectFound.creator.toString() !== req.user._id.toString()){
            return res.status(403).json({message : 'You are not the creator of this proyect'})
        };

        const colaboratorExists = await User.findOne({ email }).select('-password -token -confirm -__v');

        // delete colaborator from the proyect
        const colaboratorIndex = proyectFound.colaborators?.findIndex(colaborator => colaborator._id.toString() === colaboratorExists?._id.toString());
        if (colaboratorIndex !== -1) {
            proyectFound.colaborators?.splice(colaboratorIndex, 1);
            await proyectFound.save();
            return res.status(200).json({ message: 'Colaborator deleted from the proyect' });
        } else {
            return res.status(400).json({ message: 'Colaborator not found in the proyect' });
        }
   
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
    searchColaborator

}