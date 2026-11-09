import type { NextFunction,Request,Response,RequestHandler } from "express";
import type { ZodType } from "zod";

export function validateRequest(schema: ZodType): RequestHandler {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ):void =>{
        const result = schema.safeParse(req.body);

        if (!result.success) {
            next(result.error);
            return;
        }

        req.body = result.data;
        next();
    };
}