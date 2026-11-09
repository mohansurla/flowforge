import express from "express";
import organizationRouter from "./modules/organizations/organization.routes.js"
import { errorHandler } from "./middleware/error-handler.js";

const app=express();

//Json body parser
app.use(express.json());

//Health route
app.get("/health",(_req,res)=>{
    res.status(200).json({status:"ok"});
});

//Organization route
app.use("/api/v1/organizations",organizationRouter);

app.use((_req,res)=>{
    res.status(404).json({error:"Not Found"});
})

app.use(errorHandler);


export default app;