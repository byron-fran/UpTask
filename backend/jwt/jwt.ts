import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const generateJWT = (id :any) : string => {
    return jwt.sign({id }, process.env.JWT_SECRET!, {expiresIn : '24h'})
}