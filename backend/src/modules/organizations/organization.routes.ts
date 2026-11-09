import  express  from 'express';
import { validateRequest } from '../../middleware/validate-request.js';
import * as organizationController from './organization.controller.js';
import { organizationSchema } from './organization.validation.js';


const router = express.Router();

router.post("/",validateRequest(organizationSchema),organizationController.create);   


export default router;