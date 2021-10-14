import { Router } from 'express';
import { DateController } from './controllers/DateController';
import ValidateOptionsMidlleware from './middlewares/ValidateOptionsMidlleware';

const routes = Router();

routes.get('/date_range', ValidateOptionsMidlleware, DateController.index);

export default routes;