import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {request, response, NextFunction, } from 'express';
import User from '../models/User';
dotenv.config()

export const checkAuth = async (req =  request, res = response, next : NextFunction) => {

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET!)
            const user = await User.findById(decoded.id).select('-password -confirm -token -createdAt -updatedAt -__v')
            req.user = user
            next()
        }
        catch(error){
            return res.status(401).json({message : 'Invalid token'})
        }
    }
    else{
        return res.status(401).json({message : 'No token'})
    }

}