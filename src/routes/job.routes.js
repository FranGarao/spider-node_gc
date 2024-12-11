import express from 'express';
import JobController from '../controllers/job.controller.js';

const route = express.Router();
const jobController = new JobController();

route.get('/', jobController.getAll);

route.get('/:id', jobController.getById);

route.post('/', jobController.create);

route.put('/:id', jobController.update);

route.delete('/:id', jobController.delete);

export default route;
