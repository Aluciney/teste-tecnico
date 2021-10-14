import { Router } from 'express';
import { DateController } from './controllers/DateController';
import ValidateOptionsMiddleware from './middlewares/ValidateOptionsMiddleware';

const routes = Router();

routes.get('/date_range', ValidateOptionsMiddleware, DateController.index);

export default routes;