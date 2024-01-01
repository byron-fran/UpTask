import {
    getProyectsByUser,
    createProyect,
    getProyectById,
    updateProyect,
    deleteProyect,
    addColaborator,
    deleteColaborator,
    addTask
} from '../controllers/proyect.controller';
import { AuthRequest, checkAuth } from '../middlewares/checkAuth';
import { Router } from 'express';

const router = Router();

router.post('/add-colaborator/:id', <any>checkAuth, addColaborator);
router.post('/delete-colaborator/:id', <any>checkAuth, deleteColaborator);
router.post('/add-task/:id',<any>checkAuth, addTask);

router.route('/')
    .get(<any>checkAuth, <any>getProyectsByUser)
    .post(<any>checkAuth, <any>createProyect);

router.route('/:id')
    .get(<any>checkAuth, <any>getProyectById)
    .put(<any>checkAuth, <any>updateProyect)
    .delete(<any>checkAuth, <any>deleteProyect);

export default router

