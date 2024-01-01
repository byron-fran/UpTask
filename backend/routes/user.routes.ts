import {Router} from 'express';
import { createUser ,loginUser, confirmAccount, 
    resetPassword, 
    verifyToken, 
    newPassword, getProfile} from '../controllers/user.controller';
import { checkAuth } from '../middlewares/checkAuth';
const router = Router()

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/confirm/:token',confirmAccount )
router.post('/reset-password', resetPassword);
router.get('/verify/:token', verifyToken);
router.post('/new-password/:token', newPassword);
router.get('/profile', <any>checkAuth, <any>getProfile)

export default router