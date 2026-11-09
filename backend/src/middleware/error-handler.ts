import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client.js";
import { AppError } from "../errors/app-error.js";

export const errorHandler:ErrorRequestHandler=(err,_req,res,_next)=>{
    if(err instanceof ZodError){
        return res.status(400).json({
            success:false,
            message:"Bad Request",
            errors:err.issues,
        });
    }
    if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code==="P2002"){
            return res.status(409).json({
                success:false,
                message:"A resource with the provided unique value already exists."
            })
        }
    }
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success:false,
            message:err.message
        })
    }

    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}

