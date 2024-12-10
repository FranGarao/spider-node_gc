import express from 'express';
import JobController from '../controllers/job.controller.js';

const route = express.Router();
const jobController = new JobController();

route.get('/', jobController.getAll);

export default route;
