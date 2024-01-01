import {Router} from 'express';
import { createTask, getTasks, deleteTask, updateTask,changeStatus,  } from '../controllers/tasks.controller';
import { checkAuth } from '../middlewares/checkAuth';
const router = Router();

router.route('/')
    .get(<any>checkAuth, <any>getTasks)
    .post(<any>checkAuth, <any>createTask);

router.route('/:id')
    .put(<any>checkAuth, <any>updateTask)
    .delete(<any>checkAuth, <any>deleteTask)        

router.post('/change-status/:id', <any>checkAuth, <any>changeStatus);

export default router;