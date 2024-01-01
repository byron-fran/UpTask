import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction, } from 'express';
import User from '../models/User';
dotenv.config();

export interface AuthRequest extends Request {
    body : any,
    headers : any,
    params : any,
    query : any,
    file : any,
    files : any,
    user : any
}

interface DecodedToken {
    id : string
}

export const checkAuth = async (req: AuthRequest, res :Response, next : NextFunction) => {

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
            const user = await User.findById(decoded.id ).select('-password -confirm -token -createdAt -updatedAt -__v')
            req.user = user 
            next()
        }
        catch(error : unknown){
            return res.status(401).json({message : 'Invalid token'})
        }
    }
    else{
        return res.status(401).json({message : 'No token'})
    }

}