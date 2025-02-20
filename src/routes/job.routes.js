import express from 'express';
import JobController from '../controllers/job.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();
const jobController = new JobController();

route.get('/',authMiddleware, jobController.getAll);

route.get('/:id',authMiddleware, jobController.getById);

route.post('/',authMiddleware, jobController.create);

route.put('/:id',authMiddleware, jobController.update);

route.delete('/:id',authMiddleware, jobController.delete);

export default route;
