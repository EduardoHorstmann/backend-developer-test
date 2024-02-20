import express from 'express';
import ControllerCompanies from '../controller/ControllerCompanies'; // Altere a forma de importação aqui
const router = express.Router();
const companiesController = new ControllerCompanies();

router.get('/', companiesController.getAllCompanies.bind(companiesController));
router.get('/:id', companiesController.getCompanyById.bind(companiesController));

export default router;
