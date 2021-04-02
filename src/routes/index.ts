import { Router } from 'express';

import PdfController from '../controllers/pdfController';

const routes = Router();
const pdfController = new PdfController()

routes.get('/', pdfController.getPdf);

export default routes;
