import { request, response } from 'express';
import { AxiosError } from 'axios';
import User from '../models/User';
import { generateId } from '../helpers/generateId';
import bcrypt from 'bcrypt';
import { generateJWT } from '../jwt/jwt';
import { AuthRequest } from '../middlewares/checkAuth';
import { emailRegister } from '../helpers/email';


const createUser = async (req = request, res = response) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const newUser = new User(req.body);
        newUser.token = generateId();

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        if (!newUser) {
            return res.status(400).json({ message: 'Error creating user' })
        }
        // send email to user to confirm account

        await emailRegister(newUser.name, newUser.email, newUser.token);

        return res.status(200).json({
            message: "User created, check your email to confirm your account",
        })

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
const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body
    try {
        const emailFound = await User.findOne({ email });
        if (!emailFound) {
            return res.status(400).json({ message: 'User not found' })
        }
        if (!emailFound.confirm) {
            return res.status(400).json({ message: 'User not confirmed' })
        }

        const matchPassword = await bcrypt.compare(password, emailFound.password)

        if (!matchPassword) {
            return res.status(400).json({ message: 'Password incorrect' })
        }
        const userWithoutPassword = {
            name: emailFound.name,
            email: emailFound.email,
            token: generateJWT(emailFound._id),
            confirm: emailFound.confirm,
            _id: emailFound._id
        }
        return res.status(200).json(userWithoutPassword)


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
const getProfile = async (req: Request & AuthRequest, res = response) => {
    const user = req.user
    return res.status(200).json(user)
}
const confirmAccount = async (req = request, res = response) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({ token });
    if (!userConfirm) {
        return res.status(400).json({ message: 'Token not found' })
    }
    try {
        userConfirm.confirm = true;
        userConfirm.token = '';
        await userConfirm.save();
        return res.status(200).json({ message: 'Account confirmed, please login' })

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

const resetPassword = async (req = request, res = response) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        user.token = generateId();
        await user.save();
        return res.status(200).json({ message: 'We send you an email to reset your password' })

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
const verifyToken = async (req = request, res = response) => {
    const { token } = req.params
    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        return res.status(200).json({ message: 'User found' })

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
const newPassword = async (req = request, res = response) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        user.password = password
        user.token = '';
        await user.save();
        return res.status(200).json({ message: 'Password updated' })

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
export {
    createUser,
    loginUser,
    confirmAccount,
    resetPassword,
    verifyToken,
    newPassword,
    getProfile
}

