import {
    getProyectsByUser,
    createProyect,
    getProyectById,
    updateProyect,
    deleteProyect,
    addColaborator,
    deleteColaborator,
    searchColaborator,
    
} from '../controllers/proyect.controller';
import { AuthRequest, checkAuth } from '../middlewares/checkAuth';
import { Router } from 'express';

const router = Router();

router.post('/add-colaborator/:id', <any>checkAuth, <any>addColaborator);
router.post('/delete-colaborator/:id/', <any>checkAuth, deleteColaborator);
router.post('/search-colaborator', <any>checkAuth, searchColaborator);

router.route('/')
    .get(<any>checkAuth, <any>getProyectsByUser)
    .post(<any>checkAuth, <any>createProyect);

router.route('/:id')
    .get(<any>checkAuth, <any>getProyectById)
    .put(<any>checkAuth, <any>updateProyect)
    .delete(<any>checkAuth, <any>deleteProyect);

export default router

