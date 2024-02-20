import express from 'express';
import ControllerJobs from '../controller/ControllerJobs'
const router = express.Router();
const jobsController = new ControllerJobs();

//Fazer o parse do corpo da requisição
router.use(express.json());
router.post('/', jobsController.create.bind(jobsController));
router.put('/:id', jobsController.updateJob.bind(jobsController));
router.delete('/:id', jobsController.deleteJob.bind(jobsController));
router.put('/:id/publish', jobsController.publishJob.bind(jobsController));
router.put('/:id/archive', jobsController.archiveJob.bind(jobsController));

export default router;