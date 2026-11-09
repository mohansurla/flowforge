    import type{RequestHandler} from 'express'
import { createOrganization } from "./organization.service.js";
import type { CreateOrganizationInput } from "./organization.validation.js";
import { AppError } from '../../errors/app-error.js';

export const create:RequestHandler=async (req,res,next) => {
    
    try{
        const userId=process.env.DEV_USER_ID;
        if(!userId){
            const error= new AppError("UserID not found",500);
            next(error);
            return;
        }

        const input = req.body as CreateOrganizationInput;

        const result=await createOrganization(userId,input);
        res.status(201).json(
            {
                message: "Organization created successfully",
                data: result,}
        );
    } catch (error){
        next(error);
    }
    
}